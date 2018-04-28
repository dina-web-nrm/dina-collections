import { flattenObjectResponse } from 'utilities/transformations'

import {
  TAXON_SERVICE_CREATE_TAXON_NAME_FAIL,
  TAXON_SERVICE_CREATE_TAXON_NAME_REQUEST,
  TAXON_SERVICE_CREATE_TAXON_NAME_SUCCESS,
} from '../../actionTypes'
import { CREATE_TAXON_NAME } from '../../endpoints'
import { TAXON_NAME } from '../../constants'

export default function createTaxonName(
  { taxonName, throwError = false } = {}
) {
  const body = {
    data: {
      attributes: { ...taxonName },
      type: TAXON_NAME,
    },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { taxonName },
      type: TAXON_SERVICE_CREATE_TAXON_NAME_REQUEST,
    })

    return apiClient.call(CREATE_TAXON_NAME, { body }).then(
      response => {
        const transformedResponse = flattenObjectResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: TAXON_SERVICE_CREATE_TAXON_NAME_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { taxonName },
          payload: error,
          type: TAXON_SERVICE_CREATE_TAXON_NAME_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
