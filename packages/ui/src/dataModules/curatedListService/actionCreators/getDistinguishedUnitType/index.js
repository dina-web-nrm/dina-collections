import { flattenObjectResponse } from 'utilities/transformations'

import {
  CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPE_FAIL,
  CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPE_REQUEST,
  CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPE_SUCCESS,
} from '../../actionTypes'
import { GET_DISTINGUISHED_UNIT_TYPE } from '../../endpoints'

export default function getDistinguishedUnitType(
  { id, throwError = false } = {}
) {
  const pathParams = { id }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { id },
      type: CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPE_REQUEST,
    })
    return apiClient
      .call(GET_DISTINGUISHED_UNIT_TYPE, {
        pathParams,
      })
      .then(
        response => {
          const transformedResponse = flattenObjectResponse(response.data)
          dispatch({
            meta: { id },
            payload: transformedResponse,
            type: CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPE_SUCCESS,
          })
          return transformedResponse
        },
        error => {
          dispatch({
            error: true,
            meta: { id },
            payload: error,
            type: CURATED_LIST_SERVICE_GET_DISTINGUISHED_UNIT_TYPE_FAIL,
          })

          if (throwError) {
            throw error
          }
        }
      )
  }
}
