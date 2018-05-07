import { flattenObjectResponse } from 'utilities/transformations'

import {
  TAXON_SERVICE_UPDATE_TAXON_NAME_ACCEPTED_TO_TAXON_FAIL,
  TAXON_SERVICE_UPDATE_TAXON_NAME_ACCEPTED_TO_TAXON_REQUEST,
  TAXON_SERVICE_UPDATE_TAXON_NAME_ACCEPTED_TO_TAXON_SUCCESS,
} from '../actionTypes'
import { TAXON } from '../constants'

export default function updateTaxonNameAcceptedToTaxon(
  { taxonNameId, taxonId, throwError = false } = {}
) {
  const callParams = {
    body: {
      data: {
        id: taxonId || undefined,
        type: TAXON,
      },
    },
    pathParams: { id: taxonNameId },
  }
  const meta = { callParams }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta,
      type: TAXON_SERVICE_UPDATE_TAXON_NAME_ACCEPTED_TO_TAXON_REQUEST,
    })

    return apiClient
      .call('taxonNameUpdateRelationBelongsToOneAcceptedToTaxon', callParams)
      .then(
        response => {
          const transformedResponse = flattenObjectResponse(response.data)
          dispatch({
            meta,
            payload: transformedResponse,
            type: TAXON_SERVICE_UPDATE_TAXON_NAME_ACCEPTED_TO_TAXON_SUCCESS,
          })
          return transformedResponse
        },
        error => {
          dispatch({
            error: true,
            meta,
            payload: error,
            type: TAXON_SERVICE_UPDATE_TAXON_NAME_ACCEPTED_TO_TAXON_FAIL,
          })

          if (throwError) {
            throw error
          }
        }
      )
  }
}
