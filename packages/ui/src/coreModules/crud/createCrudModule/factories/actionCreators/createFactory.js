import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'
import getActionActionTypes from './utilities/getActionActionTypes'

export const dep = new Dependor({
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
          ...item,
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

      return apiClient.create(resource, callParams).then(
        response => {
          dispatch({
            meta: callParams,
            payload: response.data,
            type: actionTypes.success,
          })
          return response.data
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
