import { flattenArrayResponse } from 'utilities/transformations'

import {
  STORAGE_SERVICE_GET_STORAGE_LOCATIONS_FAIL,
  STORAGE_SERVICE_GET_STORAGE_LOCATIONS_REQUEST,
  STORAGE_SERVICE_GET_STORAGE_LOCATIONS_SUCCESS,
} from '../../actionTypes'
import { GET_STORAGE_LOCATIONS } from '../../endpoints'

export default function getStorageLocations({ throwError = false } = {}) {
  return (dispatch, getState, { apiClient }) => {
    dispatch({
      type: STORAGE_SERVICE_GET_STORAGE_LOCATIONS_REQUEST,
    })
    return apiClient.call(GET_STORAGE_LOCATIONS).then(
      response => {
        const transformedResponse = flattenArrayResponse(response)
        dispatch({
          payload: transformedResponse,
          type: STORAGE_SERVICE_GET_STORAGE_LOCATIONS_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          payload: error,
          type: STORAGE_SERVICE_GET_STORAGE_LOCATIONS_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
