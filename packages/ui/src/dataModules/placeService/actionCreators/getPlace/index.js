import { flattenObjectResponse } from 'utilities/transformations'

import {
  PLACE_SERVICE_GET_PLACE_FAIL,
  PLACE_SERVICE_GET_PLACE_REQUEST,
  PLACE_SERVICE_GET_PLACE_SUCCESS,
} from '../../actionTypes'
import { GET_PLACE } from '../../endpoints'

export default function getPlace({ id, throwError = false } = {}) {
  const pathParams = { id }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { id },
      type: PLACE_SERVICE_GET_PLACE_REQUEST,
    })
    return apiClient
      .call(GET_PLACE, {
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
            type: PLACE_SERVICE_GET_PLACE_SUCCESS,
          })
          return transformedResponse
        },
        error => {
          dispatch({
            error: true,
            meta: { id },
            payload: error,
            type: PLACE_SERVICE_GET_PLACE_FAIL,
          })

          if (throwError) {
            throw error
          }
        }
      )
  }
}
