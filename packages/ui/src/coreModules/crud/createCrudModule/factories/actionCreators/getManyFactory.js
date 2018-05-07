import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'
import getActionActionTypes from './utilities/getActionActionTypes'

export const dep = new Dependor({
  getActionActionTypes,
})

const log = createLog('coreModules:crud:actionCreators:getMany')

export default function getManyAcFactory(
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

  return function getManyAc({
    queryParams: queryParamsInput = {},
    relationships,
    throwError = false,
  }) {
    log.debug(`${resource}.getMany called`, {
      queryParamsInput,
      relationships,
      throwError,
    })
    const queryParams = relationships
      ? { ...queryParamsInput, relationships }
      : queryParamsInput

    const callParams = {
      queryParams,
    }

    return (dispatch, getState, { apiClient }) => {
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
