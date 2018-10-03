import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'
import getActionActionTypes from './utilities/getActionActionTypes'

export const dep = new Dependor({
  getActionActionTypes,
})

const log = createLog('coreModules:crud:actionCreators:create')

export default function delAcFactory(
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

  return function delAc({ id, throwError = false } = {}) {
    log.debug(`${resource}.del called`, { id })

    return (dispatch, getState, { apiClient }) => {
      if (id === undefined) {
        throw new Error('Id is required')
      }
      const body = {}

      const callParams = {
        body,
        pathParams: {
          id,
        },
      }

      dispatch({
        meta: callParams,
        type: actionTypes.request,
      })

      return apiClient.del(resource, callParams).then(
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
