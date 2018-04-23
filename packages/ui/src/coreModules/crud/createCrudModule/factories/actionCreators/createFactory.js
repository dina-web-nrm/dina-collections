import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'
import { flattenObjectResponse } from 'utilities/transformations'
import getActionActionTypes from './utilities/getActionActionTypes'

export const dep = new Dependor({
  flattenObjectResponse,
  getActionActionTypes,
})

const log = createLog('coreModules:crud:actionCreators:create')

export default function createAcFactory(
  { operationId, operationType, resource, resourceActionTypes } = {}
) {
  const actionTypes = dep.getActionActionTypes({
    operationType,
    resource,
    resourceActionTypes,
  })

  if (!resource) {
    throw new Error('resource is required')
  }

  if (!operationId) {
    throw new Error('operationId is required')
  }

  return function createAc({ item, throwError = false }) {
    log.debug(`${resource}.create called`, { item, throwError })
    return (dispatch, getState, { apiClient }) => {
      if (!item) {
        throw new Error('Item is required')
      }
      const body = {
        data: {
          attributes: { ...item },
          type: resource,
        },
      }

      const callParams = {
        body,
      }

      dispatch({
        meta: callParams,
        type: actionTypes.request,
      })

      return apiClient.call(operationId, callParams).then(
        response => {
          const transformedResponse = dep.flattenObjectResponse(response.data)
          dispatch({
            meta: callParams,
            payload: transformedResponse,
            type: actionTypes.success,
          })
          return transformedResponse
        },
        error => {
          dispatch({
            error: true,
            meta: callParams,
            payload: error,
            type: actionTypes.fail,
          })

          if (throwError) {
            throw error
          }
          return error
        }
      )
    }
  }
}
