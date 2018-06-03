import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'
import getActionActionTypes from './utilities/getActionActionTypes'
import dispatchIncludedActions from './dispatchIncludedActions'

export const dep = new Dependor({
  getActionActionTypes,
})

const log = createLog('coreModules:crud:actionCreators:getMany')

export default function getManyAcFactory(
  {
    actionTypes,
    operationId,
    operationType,
    resource,
    resourceActionTypes,
  } = {}
) {
  const operationActionTypes = dep.getActionActionTypes({
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

  return function getManyAc(
    {
      ids,
      include,
      isLookup, // TODO - remove this
      queryParams: queryParamsInput = {},
      relationships,
      throwError = false,
    } = {}
  ) {
    log.debug(`${resource}.getMany called`, {
      queryParamsInput,
      relationships,
      throwError,
    })

    let queryParams = {
      ...queryParamsInput,
    }
    if (relationships) {
      queryParams = {
        ...queryParams,
        relationships,
      }
    }

    if (include) {
      queryParams = {
        ...queryParams,
        include,
      }
    }

    if (ids) {
      queryParams = {
        ...queryParams,
        filter: {
          ids,
        },
      }
    }

    const callParams = {
      isLookup,
      queryParams,
    }

    return (dispatch, getState, { apiClient }) => {
      dispatch({
        meta: callParams,
        type: operationActionTypes.request,
      })
      return apiClient.getMany(resource, callParams).then(
        response => {
          if (response.included) {
            dispatchIncludedActions({
              actionTypes,
              dispatch,
              included: response.included,
            })
          }
          dispatch({
            meta: callParams,
            payload: response.data,
            type: operationActionTypes.success,
          })
          return response.data
        },
        error => {
          dispatch({
            error: true,
            meta: callParams,
            payload: error,
            type: operationActionTypes.fail,
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
