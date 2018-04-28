import { flattenArrayResponse } from 'utilities/transformations'

import {
  TAXON_SERVICE_GET_TAXA_FAIL,
  TAXON_SERVICE_GET_TAXA_REQUEST,
  TAXON_SERVICE_GET_TAXA_SUCCESS,
} from '../../actionTypes'
import { GET_TAXA } from '../../endpoints'

export default function getTaxa(
  { queryParams = {}, isLookup = false, throwError = false } = {}
) {
  return (dispatch, getState, { apiClient }) => {
    const meta = isLookup ? { isLookup, queryParams } : { queryParams }
    dispatch({
      meta,
      type: TAXON_SERVICE_GET_TAXA_REQUEST,
    })

    return apiClient.call(GET_TAXA, { queryParams }).then(
      response => {
        const transformedResponse = flattenArrayResponse(response.data)
        dispatch({
          meta,
          payload: transformedResponse,
          type: TAXON_SERVICE_GET_TAXA_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta,
          payload: error,
          type: TAXON_SERVICE_GET_TAXA_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
