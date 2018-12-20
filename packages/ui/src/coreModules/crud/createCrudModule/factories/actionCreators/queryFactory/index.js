import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'
import getActionActionTypes from '../utilities/getActionActionTypes'
import performQuery from './performQuery'
import createCallParams from './createCallParams'

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

  return function queryAc(
    {
      aggregations,
      batchLimit,
      excludeFields,
      idsInMeta,
      includeDeactivated,
      includeFields,
      limit = 1000,
      offset = 0,
      query,
      sort,
      throwError = false,
      useScroll,
    } = {}
  ) {
    const multipleBatches = limit + offset > 2000

    log.debug(`${resource}.create called`, {
      aggregations,
      excludeFields,
      idsInMeta,
      includeDeactivated,
      includeFields,
      limit,
      multipleBatches,
      offset,
      query,
      sort,
      useScroll,
    })

    return (dispatch, getState, { apiClient }) => {
      const callParams = createCallParams({
        aggregations,
        excludeFields,
        idsInMeta,
        includeDeactivated,
        includeFields,
        limit,
        multipleBatches,
        offset,
        options,
        query,
        sort,
        useScroll,
      })
      dispatch({
        meta: callParams,
        type: actionTypes.request,
      })
      return performQuery({
        apiClient,
        batchLimit,
        callParams,
        limit,
        multipleBatches,
        operationId,
        options,
        useScroll,
      }).then(
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
