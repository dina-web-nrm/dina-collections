import { flattenObjectResponse } from 'utilities/transformations'

import {
  STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_FAIL,
  STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_REQUEST,
  STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_SUCCESS,
} from '../../actionTypes'
import { UPDATE_PHYSICAL_UNIT } from '../../endpoints'
import { PHYSICAL_UNIT } from '../../constants'

export default function updatePhysicalObject(
  { physicalObject, throwError = false } = {}
) {
  const { id, ...rest } = physicalObject

  const callParams = {
    body: {
      data: {
        attributes: rest,
        id,
        type: PHYSICAL_UNIT,
      },
    },
    pathParams: { id },
  }

  return (dispatch, getState, { apiClient }) => {
    dispatch({
      meta: { physicalObject },
      type: STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_REQUEST,
    })

    return apiClient.call(UPDATE_PHYSICAL_UNIT, callParams).then(
      response => {
        const transformedResponse = flattenObjectResponse(response.data)
        dispatch({
          payload: transformedResponse,
          type: STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_SUCCESS,
        })
        return transformedResponse
      },
      error => {
        dispatch({
          error: true,
          meta: { physicalObject },
          payload: error,
          type: STORAGE_SERVICE_UPDATE_PHYSICAL_UNIT_FAIL,
        })

        if (throwError) {
          throw error
        }
      }
    )
  }
}
