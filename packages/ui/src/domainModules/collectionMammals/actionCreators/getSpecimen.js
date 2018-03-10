import { getPhysicalUnit } from 'domainModules/storageService/actionCreators'
import flattenObjectResponse from 'utilities/transformations/flattenObjectResponse'

import {
  COLLECTION_MAMMALS_GET_SPECIMEN_FAIL,
  COLLECTION_MAMMALS_GET_SPECIMEN_REQUEST,
  COLLECTION_MAMMALS_GET_SPECIMEN_SUCCESS,
} from '../actionTypes'
import { GET_SPECIMEN } from '../endpoints'

export default function getSpecimen({ id, throwError = false } = {}) {
  const meta = { id }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta,
      type: COLLECTION_MAMMALS_GET_SPECIMEN_REQUEST,
    })
    return apiClient
      .call(GET_SPECIMEN, {
        pathParams: { id },
      })
      .then(
        response => {
          if (response.data.relationships) {
            const { physicalUnits } = response.data.relationships
            return Promise.all(
              physicalUnits.data.map(physicalUnit => {
                return dispatch(
                  getPhysicalUnit({
                    id: physicalUnit.id,
                    throwError: true,
                  })
                )
              })
            )
              .then(() => {
                dispatch({
                  meta,
                  payload: flattenObjectResponse(response.data),
                  type: COLLECTION_MAMMALS_GET_SPECIMEN_SUCCESS,
                })
                return response
              })
              .catch(errors => {
                dispatch({
                  error: true,
                  meta,
                  payload: errors,
                  type: COLLECTION_MAMMALS_GET_SPECIMEN_FAIL,
                })

                if (throwError) {
                  throw errors
                }
              })
          }

          dispatch({
            meta,
            payload: flattenObjectResponse(response.data),
            type: COLLECTION_MAMMALS_GET_SPECIMEN_SUCCESS,
          })
          return response
        },
        error => {
          dispatch({
            error: true,
            meta,
            payload: error,
            type: COLLECTION_MAMMALS_GET_SPECIMEN_FAIL,
          })

          if (throwError) {
            throw error
          }
        }
      )
  }
}
