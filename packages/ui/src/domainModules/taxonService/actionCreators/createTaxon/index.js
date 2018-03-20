import { flattenObjectResponse } from 'utilities/transformations'

import {
  TAXON_SERVICE_CREATE_TAXON_FAIL,
  TAXON_SERVICE_CREATE_TAXON_REQUEST,
  TAXON_SERVICE_CREATE_TAXON_SUCCESS,
} from '../../actionTypes'
import { CREATE_TAXON } from '../../endpoints'
import { TAXON } from '../../constants'

export default function createTaxon({ taxon, throwError = false } = {}) {
  const body = {
    data: {
      attributes: { ...taxon },
      type: TAXON,
    },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { taxon },
      type: TAXON_SERVICE_CREATE_TAXON_REQUEST,
    })

    return apiClient.call(CREATE_TAXON, { body }).then(
      response => {
        const transformedResponse = flattenObjectResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: TAXON_SERVICE_CREATE_TAXON_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { taxon },
          payload: error,
          type: TAXON_SERVICE_CREATE_TAXON_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
