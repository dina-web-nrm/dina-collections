import { flattenObjectResponse } from 'utilities/transformations'

import {
  STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_FAIL,
  STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_REQUEST,
  STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_SUCCESS,
} from '../../actionTypes'
import {
  CREATE_PHYSICAL_UNIT,
  UPDATE_PHYSICAL_UNIT_STORAGE_LOCATION,
} from '../../endpoints'
import { PHYSICAL_UNIT, STORAGE_LOCATION } from '../../constants'

export default function createPhysicalUnit(
  { physicalUnit, throwError = false } = {}
) {
  const { storageLocation, ...rest } = physicalUnit

  const body = {
    data: {
      attributes: { ...rest },
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
        if (storageLocation) {
          const storageLocationBody = {
            data: {
              id: storageLocation.id,
              type: STORAGE_LOCATION,
            },
          }
          const pathParams = {
            id: response.data.id,
          }
          return apiClient
            .call(UPDATE_PHYSICAL_UNIT_STORAGE_LOCATION, {
              body: storageLocationBody,
              pathParams,
            })
            .then(res => {
              const transformedResponse = flattenObjectResponse(res.data)
              dispatch({
                payload: transformedResponse,
                type: STORAGE_SERVICE_CREATE_PHYSICAL_UNIT_SUCCESS,
              })
              return transformedResponse
            })
        }

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
