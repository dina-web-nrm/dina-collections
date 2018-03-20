import { flattenObjectResponse } from 'utilities/transformations'

import {
  CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_FAIL,
  CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_REQUEST,
  CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_SUCCESS,
} from '../../actionTypes'
import { GET_FEATURE_OBSERVATION_TYPE } from '../../endpoints'

export default function getFeatureObservationType(
  { id, throwError = false } = {}
) {
  const pathParams = { id }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { id },
      type: CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_REQUEST,
    })
    return apiClient
      .call(GET_FEATURE_OBSERVATION_TYPE, {
        pathParams,
      })
      .then(
        response => {
          const transformedResponse = flattenObjectResponse(response.data)
          dispatch({
            meta: { id },
            payload: transformedResponse,
            type: CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_SUCCESS,
          })
          return transformedResponse
        },
        error => {
          dispatch({
            error: true,
            meta: { id },
            payload: error,
            type: CURATED_LIST_SERVICE_GET_FEATURE_OBSERVATION_TYPE_FAIL,
          })

          if (throwError) {
            throw error
          }
        }
      )
  }
}
