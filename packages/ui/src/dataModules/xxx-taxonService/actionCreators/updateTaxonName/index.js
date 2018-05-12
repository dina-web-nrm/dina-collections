import { flattenObjectResponse } from 'utilities/transformations'

import {
  TAXON_SERVICE_UPDATE_TAXON_NAME_FAIL,
  TAXON_SERVICE_UPDATE_TAXON_NAME_REQUEST,
  TAXON_SERVICE_UPDATE_TAXON_NAME_SUCCESS,
} from '../../actionTypes'
import { UPDATE_TAXON_NAME } from '../../endpoints'
import { TAXON_NAME } from '../../constants'

export default function updateTaxonName(
  { taxonName, throwError = false } = {}
) {
  const { id, ...rest } = taxonName

  const callParams = {
    body: {
      data: {
        attributes: rest,
        id,
        type: TAXON_NAME,
      },
    },
    pathParams: { id },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { taxonName },
      type: TAXON_SERVICE_UPDATE_TAXON_NAME_REQUEST,
    })

    return apiClient.call(UPDATE_TAXON_NAME, callParams).then(
      response => {
        const transformedResponse = flattenObjectResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: TAXON_SERVICE_UPDATE_TAXON_NAME_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { taxonName },
          payload: error,
          type: TAXON_SERVICE_UPDATE_TAXON_NAME_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
