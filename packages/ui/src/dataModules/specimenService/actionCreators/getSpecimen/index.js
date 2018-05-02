import { getPhysicalObject } from 'dataModules/storageService/actionCreators'
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
          if (response.data && response.data.relationships) {
            const { physicalObjects } = response.data.relationships
            return Promise.all([
              ...physicalObjects.data.map(physicalObject => {
                return dispatch(
                  getPhysicalObject({
                    id: physicalObject.id,
                    throwError: true,
                  })
                )
              }),
            ])
              .then(() => {
                dispatch({
                  meta,
                  payload: response.data,
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
            payload: response.data,
            type: SPECIMEN_SERVICE_GET_SPECIMEN_SUCCESS,
          })
          return response.data
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
