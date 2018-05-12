import { flattenObjectResponse } from 'utilities/transformations'

import {
  TAXON_SERVICE_UPDATE_TAXON_FAIL,
  TAXON_SERVICE_UPDATE_TAXON_REQUEST,
  TAXON_SERVICE_UPDATE_TAXON_SUCCESS,
} from '../../actionTypes'
import { UPDATE_TAXON } from '../../endpoints'
import { TAXON } from '../../constants'

export default function updateTaxon({ taxon, throwError = false } = {}) {
  const { id, ...rest } = taxon

  const callParams = {
    body: {
      data: {
        attributes: rest,
        id,
        type: TAXON,
      },
    },
    pathParams: { id },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { taxon },
      type: TAXON_SERVICE_UPDATE_TAXON_REQUEST,
    })

    return apiClient.call(UPDATE_TAXON, callParams).then(
      response => {
        const transformedResponse = flattenObjectResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: TAXON_SERVICE_UPDATE_TAXON_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { taxon },
          payload: error,
          type: TAXON_SERVICE_UPDATE_TAXON_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
