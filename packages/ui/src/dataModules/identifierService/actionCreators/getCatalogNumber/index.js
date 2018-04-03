import { flattenObjectResponse } from 'utilities/transformations'

import {
  IDENTIFIER_SERVICE_GET_CATALOG_NUMBER_FAIL,
  IDENTIFIER_SERVICE_GET_CATALOG_NUMBER_REQUEST,
  IDENTIFIER_SERVICE_GET_CATALOG_NUMBER_SUCCESS,
} from '../../actionTypes'
import { GET_CATALOG_NUMBER } from '../../endpoints'

export default function getCatalogNumber({ id, throwError = false } = {}) {
  const pathParams = { id }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { id },
      type: IDENTIFIER_SERVICE_GET_CATALOG_NUMBER_REQUEST,
    })
    return apiClient.call(GET_CATALOG_NUMBER, { pathParams }).then(
      response => {
        const transformedResponse = flattenObjectResponse(response.data)
        dispatch({
          meta: { id },
          payload: transformedResponse,
          type: IDENTIFIER_SERVICE_GET_CATALOG_NUMBER_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { id },
          payload: error,
          type: IDENTIFIER_SERVICE_GET_CATALOG_NUMBER_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
