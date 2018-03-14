import { flattenArrayResponse } from 'utilities/transformations'

import {
  LOCALITY_SERVICE_GET_CURATED_LOCALITIES_FAIL,
  LOCALITY_SERVICE_GET_CURATED_LOCALITIES_REQUEST,
  LOCALITY_SERVICE_GET_CURATED_LOCALITIES_SUCCESS,
} from '../../actionTypes'
import { GET_CURATED_LOCALITIES } from '../../endpoints'

export default function getCuratedLocalities({ throwError = false } = {}) {
  return (dispatch, getState, { apiClient }) => {
    dispatch({
      type: LOCALITY_SERVICE_GET_CURATED_LOCALITIES_REQUEST,
    })
    return apiClient.call(GET_CURATED_LOCALITIES).then(
      response => {
        const transformedResponse = flattenArrayResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: LOCALITY_SERVICE_GET_CURATED_LOCALITIES_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          payload: error,
          type: LOCALITY_SERVICE_GET_CURATED_LOCALITIES_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
