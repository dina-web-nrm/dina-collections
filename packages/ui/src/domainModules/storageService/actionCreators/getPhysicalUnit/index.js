import { flattenObjectResponse } from 'utilities/transformations'

import {
  STORAGE_SERVICE_GET_PHYSICAL_UNIT_FAIL,
  STORAGE_SERVICE_GET_PHYSICAL_UNIT_REQUEST,
  STORAGE_SERVICE_GET_PHYSICAL_UNIT_SUCCESS,
} from '../../actionTypes'
import { GET_PHYSICAL_UNIT } from '../../endpoints'

export default function getPhysicalUnit({ id, throwError = false } = {}) {
  const pathParams = { id }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { id },
      type: STORAGE_SERVICE_GET_PHYSICAL_UNIT_REQUEST,
    })
    return apiClient
      .call(GET_PHYSICAL_UNIT, {
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
            type: STORAGE_SERVICE_GET_PHYSICAL_UNIT_SUCCESS,
          })
          return transformedResponse
        },
        error => {
          dispatch({
            error: true,
            meta: { id },
            payload: error,
            type: STORAGE_SERVICE_GET_PHYSICAL_UNIT_FAIL,
          })

          if (throwError) {
            throw error
          }
        }
      )
  }
}
