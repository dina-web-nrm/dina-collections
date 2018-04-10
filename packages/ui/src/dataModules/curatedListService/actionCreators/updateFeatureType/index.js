import { flattenObjectResponse } from 'utilities/transformations'

import {
  CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_FAIL,
  CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_REQUEST,
  CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_SUCCESS,
} from '../../actionTypes'
import { UPDATE_FEATURE_OBSERVATION_TYPE } from '../../endpoints'
import { FEATURE_OBSERVATION_TYPE } from '../../constants'

export default function updateFeatureType(
  { featureType, throwError = false } = {}
) {
  const { id, ...rest } = featureType

  const callParams = {
    body: {
      data: {
        attributes: rest,
        id,
        type: FEATURE_OBSERVATION_TYPE,
      },
    },
    pathParams: { id },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { featureType },
      type: CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_REQUEST,
    })

    return apiClient.call(UPDATE_FEATURE_OBSERVATION_TYPE, callParams).then(
      response => {
        const transformedResponse = flattenObjectResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { featureType },
          payload: error,
          type: CURATED_LIST_SERVICE_UPDATE_FEATURE_OBSERVATION_TYPE_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
