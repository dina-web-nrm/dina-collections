import { flattenObjectResponse } from 'utilities/transformations'

import {
  STORAGE_SERVICE_CREATE_STORAGE_LOCATION_FAIL,
  STORAGE_SERVICE_CREATE_STORAGE_LOCATION_REQUEST,
  STORAGE_SERVICE_CREATE_STORAGE_LOCATION_SUCCESS,
} from '../../actionTypes'
import { CREATE_STORAGE_LOCATION } from '../../endpoints'
import { STORAGE_LOCATION } from '../../constants'

export default function createStorageLocation(
  { storageLocation, throwError = false } = {}
) {
  const body = {
    data: {
      attributes: { ...storageLocation },
      type: STORAGE_LOCATION,
    },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { storageLocation },
      type: STORAGE_SERVICE_CREATE_STORAGE_LOCATION_REQUEST,
    })

    return apiClient.call(CREATE_STORAGE_LOCATION, { body }).then(
      response => {
        const transformedResponse = flattenObjectResponse(response)
        dispatch({
          payload: transformedResponse,
          type: STORAGE_SERVICE_CREATE_STORAGE_LOCATION_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { storageLocation },
          payload: error,
          type: STORAGE_SERVICE_CREATE_STORAGE_LOCATION_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
