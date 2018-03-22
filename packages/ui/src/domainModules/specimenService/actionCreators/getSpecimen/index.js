import { getPhysicalUnit } from 'domainModules/storageService/actionCreators'
import { getTaxon } from 'domainModules/taxonService/actionCreators'
import { flattenObjectResponse } from 'utilities/transformations'

import {
  SPECIMEN_SERVICE_GET_SPECIMEN_FAIL,
  SPECIMEN_SERVICE_GET_SPECIMEN_REQUEST,
  SPECIMEN_SERVICE_GET_SPECIMEN_SUCCESS,
} from '../../actionTypes'
import { GET_SPECIMEN } from '../../endpoints'

export default function getSpecimen({ id, throwError = false } = {}) {
  const meta = { id }
  const pathParams = { id }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta,
      type: SPECIMEN_SERVICE_GET_SPECIMEN_REQUEST,
    })
    return apiClient
      .call(GET_SPECIMEN, {
        pathParams,
        queryParams: {
          relationships: ['all'],
        },
      })
      .then(
        response => {
          const transformedResponse = flattenObjectResponse(response.data)
          if (response.data && response.data.relationships) {
            const { physicalUnits, taxa } = response.data.relationships
            return Promise.all([
              ...physicalUnits.data.map(physicalUnit => {
                return dispatch(
                  getPhysicalUnit({
                    id: physicalUnit.id,
                    throwError: true,
                  })
                )
              }),
              ...taxa.data.map(taxon => {
                return dispatch(
                  getTaxon({
                    id: taxon.id,
                    throwError: true,
                  })
                )
              }),
            ])
              .then(() => {
                dispatch({
                  meta,
                  payload: transformedResponse,
                  type: SPECIMEN_SERVICE_GET_SPECIMEN_SUCCESS,
                })
                return response
              })
              .catch(errors => {
                dispatch({
                  error: true,
                  meta,
                  payload: errors,
                  type: SPECIMEN_SERVICE_GET_SPECIMEN_FAIL,
                })

                if (throwError) {
                  throw errors
                }
              })
          }

          dispatch({
            meta,
            payload: transformedResponse,
            type: SPECIMEN_SERVICE_GET_SPECIMEN_SUCCESS,
          })
          return transformedResponse
        },
        error => {
          dispatch({
            error: true,
            meta: { id },
            payload: error,
            type: SPECIMEN_SERVICE_GET_SPECIMEN_FAIL,
          })

          if (throwError) {
            throw error
          }
        }
      )
  }
}
