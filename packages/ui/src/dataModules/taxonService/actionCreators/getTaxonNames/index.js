import { flattenArrayResponse } from 'utilities/transformations'

import {
  TAXON_SERVICE_GET_TAXON_NAMES_FAIL,
  TAXON_SERVICE_GET_TAXON_NAMES_REQUEST,
  TAXON_SERVICE_GET_TAXON_NAMES_SUCCESS,
} from '../../actionTypes'
import { GET_TAXON_NAMES } from '../../endpoints'

export default function getTaxonNames(
  { queryParams = {}, isLookup = false, throwError = false } = {}
) {
  return (dispatch, getState, { apiClient }) => {
    const meta = isLookup ? { isLookup, queryParams } : { queryParams }
    dispatch({
      meta,
      type: TAXON_SERVICE_GET_TAXON_NAMES_REQUEST,
    })

    return apiClient.call(GET_TAXON_NAMES, { queryParams }).then(
      response => {
        const transformedResponse = flattenArrayResponse(response.data)
        dispatch({
          meta,
          payload: transformedResponse,
          type: TAXON_SERVICE_GET_TAXON_NAMES_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta,
          payload: error,
          type: TAXON_SERVICE_GET_TAXON_NAMES_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
