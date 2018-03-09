import { flattenObjectResponse } from 'utilities/transformations'

import {
  LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_FAIL,
  LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_REQUEST,
  LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_SUCCESS,
} from '../../actionTypes'
import { CREATE_CURATED_LOCALITY } from '../../endpoints'
import { CURATED_LOCALITY } from '../../constants'

export default function createCuratedLocality(
  { curatedLocality, throwError = false } = {}
) {
  const body = {
    data: {
      attributes: { ...curatedLocality },
      type: CURATED_LOCALITY,
    },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { curatedLocality },
      type: LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_REQUEST,
    })

    return apiClient.call(CREATE_CURATED_LOCALITY, { body }).then(
      response => {
        const transformedResponse = flattenObjectResponse(response)
        dispatch({
          payload: transformedResponse,
          type: LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { curatedLocality },
          payload: error,
          type: LOCALITY_SERVICE_CREATE_CURATED_LOCALITY_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
