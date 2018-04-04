import { flattenArrayResponse } from 'utilities/transformations'

import {
  SPECIMEN_SERVICE_GET_SPECIMENS_FAIL,
  SPECIMEN_SERVICE_GET_SPECIMENS_REQUEST,
  SPECIMEN_SERVICE_GET_SPECIMENS_SUCCESS,
} from '../../actionTypes'
import { GET_SPECIMENS } from '../../endpoints'

export default function getSpecimens(
  { queryParams = {}, throwError = false } = {}
) {
  const meta = queryParams
  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta,
      type: SPECIMEN_SERVICE_GET_SPECIMENS_REQUEST,
    })
    return apiClient.call(GET_SPECIMENS, { queryParams }).then(
      response => {
        const transformedResponse = flattenArrayResponse(response.data)
        dispatch({
          meta,
          payload: transformedResponse,
          type: SPECIMEN_SERVICE_GET_SPECIMENS_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta,
          payload: error,
          type: SPECIMEN_SERVICE_GET_SPECIMENS_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
