import { flattenArrayResponse } from 'utilities/transformations'

import {
  PLACE_SERVICE_GET_PLACES_FAIL,
  PLACE_SERVICE_GET_PLACES_REQUEST,
  PLACE_SERVICE_GET_PLACES_SUCCESS,
} from '../../actionTypes'
import { GET_PLACES } from '../../endpoints'

export default function getPlaces(
  { queryParams = {}, throwError = false } = {}
) {
  return (dispatch, getState, { apiClient }) => {
    dispatch({
      type: PLACE_SERVICE_GET_PLACES_REQUEST,
    })
    return apiClient.call(GET_PLACES, { queryParams }).then(
      response => {
        const transformedResponse = flattenArrayResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: PLACE_SERVICE_GET_PLACES_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          payload: error,
          type: PLACE_SERVICE_GET_PLACES_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
