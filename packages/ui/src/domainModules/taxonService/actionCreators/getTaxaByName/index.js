import { flattenArrayResponse } from 'utilities/transformations'

import {
  TAXON_SERVICE_GET_TAXA_BY_NAME_FAIL,
  TAXON_SERVICE_GET_TAXA_BY_NAME_REQUEST,
  TAXON_SERVICE_GET_TAXA_BY_NAME_SUCCESS,
} from '../../actionTypes'
import { GET_TAXA_BY_NAME } from '../../endpoints'

export default function getTaxaByName(
  { queryParams = {}, throwError = false } = {}
) {
  return (dispatch, getState, { apiClient }) => {
    dispatch({
      type: TAXON_SERVICE_GET_TAXA_BY_NAME_REQUEST,
    })

    return apiClient.call(GET_TAXA_BY_NAME, queryParams).then(
      response => {
        const transformedResponse = flattenArrayResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: TAXON_SERVICE_GET_TAXA_BY_NAME_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          payload: error,
          type: TAXON_SERVICE_GET_TAXA_BY_NAME_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
