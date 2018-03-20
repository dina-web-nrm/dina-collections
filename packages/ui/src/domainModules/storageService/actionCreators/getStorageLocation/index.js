import { flattenObjectResponse } from 'utilities/transformations'

import {
  STORAGE_SERVICE_GET_STORAGE_LOCATION_FAIL,
  STORAGE_SERVICE_GET_STORAGE_LOCATION_REQUEST,
  STORAGE_SERVICE_GET_STORAGE_LOCATION_SUCCESS,
} from '../../actionTypes'
import { GET_STORAGE_LOCATION } from '../../endpoints'

export default function getStorageLocation({ id, throwError = false } = {}) {
  const pathParams = { id }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { id },
      type: STORAGE_SERVICE_GET_STORAGE_LOCATION_REQUEST,
    })
    return apiClient
      .call(GET_STORAGE_LOCATION, {
        pathParams,
        queryParams: {
          relationships: ['all'],
        },
      })
      .then(
        response => {
          const transformedResponse = flattenObjectResponse(response.data)
          dispatch({
            meta: { id },
            payload: transformedResponse,
            type: STORAGE_SERVICE_GET_STORAGE_LOCATION_SUCCESS,
          })
          return transformedResponse
        },
        error => {
          dispatch({
            error: true,
            meta: { id },
            payload: error,
            type: STORAGE_SERVICE_GET_STORAGE_LOCATION_FAIL,
          })

          if (throwError) {
            throw error
          }
        }
      )
  }
}
