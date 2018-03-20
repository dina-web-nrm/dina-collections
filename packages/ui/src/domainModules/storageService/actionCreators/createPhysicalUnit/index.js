import { flattenObjectResponse } from 'utilities/transformations'

import {
  STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_FAIL,
  STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_REQUEST,
  STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_SUCCESS,
} from '../../actionTypes'
import { CREATE_PHYSICAL_UNIT } from '../../endpoints'
import { PHYSICAL_UNIT } from '../../constants'

export default function createPhysicalUnit(
  { physicalUnit, throwError = false } = {}
) {
  const body = {
    data: {
      attributes: { ...physicalUnit },
      type: PHYSICAL_UNIT,
    },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { physicalUnit },
      type: STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_REQUEST,
    })

    return apiClient.call(CREATE_PHYSICAL_UNIT, { body }).then(
      response => {
        const transformedResponse = flattenObjectResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { physicalUnit },
          payload: error,
          type: STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
