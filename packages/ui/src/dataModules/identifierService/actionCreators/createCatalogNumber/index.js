import { flattenObjectResponse } from 'utilities/transformations'

import {
  IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_FAIL,
  IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_REQUEST,
  IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_SUCCESS,
} from '../../actionTypes'
import { CREATE_CATALOG_NUMBER } from '../../endpoints'
import { CATALOG_NUMBER } from '../../constants'

export default function createCatalogNumber(
  { catalogNumber, throwError = false } = {}
) {
  const body = {
    data: {
      attributes: { ...catalogNumber },
      type: CATALOG_NUMBER,
    },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { catalogNumber },
      type: IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_REQUEST,
    })

    return apiClient.call(CREATE_CATALOG_NUMBER, { body }).then(
      response => {
        const transformedResponse = flattenObjectResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { catalogNumber },
          payload: error,
          type: IDENTIFIER_SERVICE_CREATE_CATALOG_NUMBER_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
