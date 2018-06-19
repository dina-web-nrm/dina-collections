import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'
import getActionActionTypes from './utilities/getActionActionTypes'

export const dep = new Dependor({
  getActionActionTypes,
})

const log = createLog('coreModules:crud:actionCreators:query')

export default function queryAcFactory(
  {
    operationId,
    operationType,
    options = {},
    resource,
    resourceActionTypes,
  } = {}
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

  return function queryAc({ body, throwError = false } = {}) {
    log.debug(`${resource}.create called`, { body })

    return (dispatch, getState, { apiClient }) => {
      if (!body) {
        throw new Error('Body is required')
      }

      if (!body.data) {
        throw new Error('body.data is required')
      }

      const callParams = {
        ...options,
        body,
      }

      dispatch({
        meta: callParams,
        type: actionTypes.request,
      })

      return apiClient.call(operationId, callParams).then(
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
