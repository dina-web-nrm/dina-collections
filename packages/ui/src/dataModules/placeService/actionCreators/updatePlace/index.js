import { flattenObjectResponse } from 'utilities/transformations'

import {
  PLACE_SERVICE_UPDATE_PLACE_FAIL,
  PLACE_SERVICE_UPDATE_PLACE_REQUEST,
  PLACE_SERVICE_UPDATE_PLACE_SUCCESS,
} from '../../actionTypes'
import { UPDATE_PLACE } from '../../endpoints'
import { PLACE } from '../../constants'

export default function updatePlace({ place, throwError = false } = {}) {
  const { id, ...rest } = place

  const callParams = {
    body: {
      data: {
        attributes: rest,
        id,
        type: PLACE,
      },
    },
    pathParams: { id },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { place },
      type: PLACE_SERVICE_UPDATE_PLACE_REQUEST,
    })

    return apiClient.call(UPDATE_PLACE, callParams).then(
      response => {
        const transformedResponse = flattenObjectResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: PLACE_SERVICE_UPDATE_PLACE_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { place },
          payload: error,
          type: PLACE_SERVICE_UPDATE_PLACE_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
