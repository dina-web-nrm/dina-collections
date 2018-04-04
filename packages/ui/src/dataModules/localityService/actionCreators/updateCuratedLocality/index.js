import { flattenObjectResponse } from 'utilities/transformations'

import {
  LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_FAIL,
  LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_REQUEST,
  LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_SUCCESS,
} from '../../actionTypes'
import { UPDATE_CURATED_LOCALITY } from '../../endpoints'
import { CURATED_LOCALITY } from '../../constants'

export default function updateCuratedLocality(
  { curatedLocality, throwError = false } = {}
) {
  const { id, ...rest } = curatedLocality

  const callParams = {
    body: {
      data: {
        attributes: rest,
        id,
        type: CURATED_LOCALITY,
      },
    },
    pathParams: { id },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { curatedLocality },
      type: LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_REQUEST,
    })

    return apiClient.call(UPDATE_CURATED_LOCALITY, callParams).then(
      response => {
        const transformedResponse = flattenObjectResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { curatedLocality },
          payload: error,
          type: LOCALITY_SERVICE_UPDATE_CURATED_LOCALITY_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
