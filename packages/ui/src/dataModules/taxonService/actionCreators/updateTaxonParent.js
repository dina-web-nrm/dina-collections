import { flattenObjectResponse } from 'utilities/transformations'

import {
  TAXON_SERVICE_UPDATE_TAXON_PARENT_FAIL,
  TAXON_SERVICE_UPDATE_TAXON_PARENT_REQUEST,
  TAXON_SERVICE_UPDATE_TAXON_PARENT_SUCCESS,
} from '../actionTypes'
import { TAXON } from '../constants'

export default function updateTaxonParent(
  { taxonId, parentId, throwError = false } = {}
) {
  const callParams = {
    body: {
      data: {
        id: parentId,
        type: TAXON,
      },
    },
    pathParams: { id: taxonId },
  }
  const meta = { callParams }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta,
      type: TAXON_SERVICE_UPDATE_TAXON_PARENT_REQUEST,
    })

    return apiClient.call('taxonUpdateRelationHasOneParent', callParams).then(
      response => {
        const transformedResponse = flattenObjectResponse(response.data)
        dispatch({
          meta,
          payload: transformedResponse,
          type: TAXON_SERVICE_UPDATE_TAXON_PARENT_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta,
          payload: error,
          type: TAXON_SERVICE_UPDATE_TAXON_PARENT_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
