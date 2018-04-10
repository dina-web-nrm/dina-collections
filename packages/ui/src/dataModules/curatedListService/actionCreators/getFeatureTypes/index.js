import { flattenArrayResponse } from 'utilities/transformations'

import {
  CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_FAIL,
  CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_REQUEST,
  CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_SUCCESS,
} from '../../actionTypes'
import { GET_FEATURE_OBSERVATION_TYPES } from '../../endpoints'

export default function getFeatureTypes({ throwError = false } = {}) {
  return (dispatch, getState, { apiClient }) => {
    dispatch({
      type: CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_REQUEST,
    })
    return apiClient.call(GET_FEATURE_OBSERVATION_TYPES).then(
      response => {
        const transformedResponse = flattenArrayResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          payload: error,
          type: CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPES_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
