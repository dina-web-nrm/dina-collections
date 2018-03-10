import { flattenObjectResponse } from 'utilities/transformations'

import {
  IDENTIFIER_SERVICE_UPDATE_CATALOG_NUMBER_FAIL,
  IDENTIFIER_SERVICE_UPDATE_CATALOG_NUMBER_REQUEST,
  IDENTIFIER_SERVICE_UPDATE_CATALOG_NUMBER_SUCCESS,
} from '../../actionTypes'
import { UPDATE_CATALOG_NUMBER } from '../../endpoints'
import { CATALOG_NUMBER } from '../../constants'

export default function updateCatalogNumber(
  { catalogNumber, throwError = false } = {}
) {
  const { id, ...rest } = catalogNumber

  const callParams = {
    body: {
      data: {
        attributes: rest,
        id,
        type: CATALOG_NUMBER,
      },
    },
    pathParams: { id },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { catalogNumber },
      type: IDENTIFIER_SERVICE_UPDATE_CATALOG_NUMBER_REQUEST,
    })

    return apiClient.call(UPDATE_CATALOG_NUMBER, callParams).then(
      response => {
        const transformedResponse = flattenObjectResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: IDENTIFIER_SERVICE_UPDATE_CATALOG_NUMBER_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { catalogNumber },
          payload: error,
          type: IDENTIFIER_SERVICE_UPDATE_CATALOG_NUMBER_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
