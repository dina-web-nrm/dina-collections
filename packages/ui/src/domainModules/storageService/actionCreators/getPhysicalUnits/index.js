import { flattenArrayResponse } from 'utilities/transformations'

import {
  STORAGE_SERVICE_GET_PHYSICAL_UNITS_FAIL,
  STORAGE_SERVICE_GET_PHYSICAL_UNITS_REQUEST,
  STORAGE_SERVICE_GET_PHYSICAL_UNITS_SUCCESS,
} from '../../actionTypes'
import { GET_PHYSICAL_UNITS } from '../../endpoints'

export default function getPhysicalUnits({ throwError = false } = {}) {
  return (dispatch, getState, { apiClient }) => {
    dispatch({
      type: STORAGE_SERVICE_GET_PHYSICAL_UNITS_REQUEST,
    })
    return apiClient.call(GET_PHYSICAL_UNITS).then(
      response => {
        const transformedResponse = flattenArrayResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: STORAGE_SERVICE_GET_PHYSICAL_UNITS_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          payload: error,
          type: STORAGE_SERVICE_GET_PHYSICAL_UNITS_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
