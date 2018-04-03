import { flattenArrayResponse } from 'utilities/transformations'

import {
  CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPES_FAIL,
  CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPES_REQUEST,
  CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPES_SUCCESS,
} from '../../actionTypes'
import { GET_DISTINGUISHED_UNIT_TYPES } from '../../endpoints'

export default function getDistinguishedUnitTypes({ throwError = false } = {}) {
  return (dispatch, getState, { apiClient }) => {
    dispatch({
      type: CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPES_REQUEST,
    })
    return apiClient.call(GET_DISTINGUISHED_UNIT_TYPES).then(
      response => {
        const transformedResponse = flattenArrayResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPES_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          payload: error,
          type: CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPES_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
