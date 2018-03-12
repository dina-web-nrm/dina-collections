import { flattenObjectResponse } from 'utilities/transformations'

import {
  LOCALITY_SERVICE_GET_CURATED_LOCALITY_FAIL,
  LOCALITY_SERVICE_GET_CURATED_LOCALITY_REQUEST,
  LOCALITY_SERVICE_GET_CURATED_LOCALITY_SUCCESS,
} from '../../actionTypes'
import { GET_CURATED_LOCALITY } from '../../endpoints'

export default function getCuratedLocality({ id, throwError = false } = {}) {
  const pathParams = { id }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { id },
      type: LOCALITY_SERVICE_GET_CURATED_LOCALITY_REQUEST,
    })
    return apiClient
      .call(GET_CURATED_LOCALITY, {
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
            type: LOCALITY_SERVICE_GET_CURATED_LOCALITY_SUCCESS,
          })
          return transformedResponse
        },
        error => {
          dispatch({
            error: true,
            meta: { id },
            payload: error,
            type: LOCALITY_SERVICE_GET_CURATED_LOCALITY_FAIL,
          })

          if (throwError) {
            throw error
          }
        }
      )
  }
}
