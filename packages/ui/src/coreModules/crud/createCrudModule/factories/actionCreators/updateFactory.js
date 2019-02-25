import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'
import nestedToCoreSync from 'common/es5/formatObject/nestedToCoreSync'
import getActionActionTypes from './utilities/getActionActionTypes'

export const dep = new Dependor({
  getActionActionTypes,
})

const log = createLog('coreModules:crud:actionCreators:update')

export default function updateAcFactory({
  operationId,
  operationType,
  options = {},
  resource,
  resourceActionTypes,
} = {}) {
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

  return function updateAc({
    item: rawItem,
    nested = false,
    throwError = true,
    options: optionsOverride = {},
  } = {}) {
    log.debug(`${resource}.update called`, {
      item: rawItem,
      throwError,
    })

    const item = nested
      ? nestedToCoreSync({
          item: rawItem,
          type: resource,
        })
      : rawItem

    return (dispatch, getState, { apiClient }) => {
      if (!item) {
        throw new Error('Item is required')
      }
      const { id } = item
      if (!id) {
        throw new Error('Id is required')
      }

      const callParams = {
        ...options,
        ...optionsOverride,
        body: {
          data: {
            ...item,
            type: resource,
          },
        },
        pathParams: { id },
      }

      dispatch({
        meta: callParams,
        type: actionTypes.request,
      })
      return apiClient.update(resource, callParams).then(
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
