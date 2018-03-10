import { flattenArrayResponse } from 'utilities/transformations'

import {
  IDENTIFIER_SERVICE_GET_CATALOG_NUMBERS_FAIL,
  IDENTIFIER_SERVICE_GET_CATALOG_NUMBERS_REQUEST,
  IDENTIFIER_SERVICE_GET_CATALOG_NUMBERS_SUCCESS,
} from '../../actionTypes'
import { GET_CATALOG_NUMBERS } from '../../endpoints'

export default function getCatalogNumbers({ throwError = false } = {}) {
  return (dispatch, getState, { apiClient }) => {
    dispatch({
      type: IDENTIFIER_SERVICE_GET_CATALOG_NUMBERS_REQUEST,
    })
    return apiClient.call(GET_CATALOG_NUMBERS).then(
      response => {
        const transformedResponse = flattenArrayResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: IDENTIFIER_SERVICE_GET_CATALOG_NUMBERS_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          payload: error,
          type: IDENTIFIER_SERVICE_GET_CATALOG_NUMBERS_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
