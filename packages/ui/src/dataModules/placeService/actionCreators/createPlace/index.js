import { flattenObjectResponse } from 'utilities/transformations'

import {
  PLACE_SERVICE_CREATE_PLACE_FAIL,
  PLACE_SERVICE_CREATE_PLACE_REQUEST,
  PLACE_SERVICE_CREATE_PLACE_SUCCESS,
} from '../../actionTypes'
import { CREATE_PLACE } from '../../endpoints'
import { PLACE } from '../../constants'

export default function createPlace({ place, throwError = false } = {}) {
  const body = {
    data: {
      attributes: { ...place },
      type: PLACE,
    },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { place },
      type: PLACE_SERVICE_CREATE_PLACE_REQUEST,
    })

    return apiClient.call(CREATE_PLACE, { body }).then(
      response => {
        const transformedResponse = flattenObjectResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: PLACE_SERVICE_CREATE_PLACE_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { place },
          payload: error,
          type: PLACE_SERVICE_CREATE_PLACE_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
