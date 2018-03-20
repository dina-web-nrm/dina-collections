import { flattenObjectResponse } from 'utilities/transformations'

import {
  TAXON_SERVICE_GET_TAXON_FAIL,
  TAXON_SERVICE_GET_TAXON_REQUEST,
  TAXON_SERVICE_GET_TAXON_SUCCESS,
} from '../../actionTypes'
import { GET_TAXON } from '../../endpoints'

export default function getTaxon({ id, throwError = false } = {}) {
  const pathParams = { id }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { id },
      type: TAXON_SERVICE_GET_TAXON_REQUEST,
    })
    return apiClient
      .call(GET_TAXON, {
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
            type: TAXON_SERVICE_GET_TAXON_SUCCESS,
          })
          return transformedResponse
        },
        error => {
          dispatch({
            error: true,
            meta: { id },
            payload: error,
            type: TAXON_SERVICE_GET_TAXON_FAIL,
          })

          if (throwError) {
            throw error
          }
        }
      )
  }
}
