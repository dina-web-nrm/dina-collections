import { flattenObjectResponse } from 'utilities/transformations'

import {
  STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_FAIL,
  STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_REQUEST,
  STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_SUCCESS,
} from '../../actionTypes'
import { UPDATE_STORAGE_LOCATION } from '../../endpoints'
import { STORAGE_LOCATION } from '../../constants'

export default function updateStorageLocation(
  { storageLocation, throwError = false } = {}
) {
  const { id, ...rest } = storageLocation

  const callParams = {
    body: {
      data: {
        attributes: rest,
        id,
        type: STORAGE_LOCATION,
      },
    },
    pathParams: { id },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { storageLocation },
      type: STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_REQUEST,
    })

    return apiClient.call(UPDATE_STORAGE_LOCATION, callParams).then(
      response => {
        const transformedResponse = flattenObjectResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { storageLocation },
          payload: error,
          type: STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
