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
      idsOnly,
      limit = 1000,
      offset = 0,
      query,
      throwError = false,
    } = {}
  ) {
    const scroll = limit + offset > 2000

    log.debug(`${resource}.create called`, {
      aggregations,
      idsOnly,
      limit,
      offset,
      query,
      scroll,
    })

    return (dispatch, getState, { apiClient }) => {
      const callParams = createCallParams({
        aggregations,
        idsOnly,
        limit,
        offset,
        options,
        query,
        scroll,
      })
      dispatch({
        meta: callParams,
        type: actionTypes.request,
      })
      return performQuery({
        apiClient,
        batchLimit,
        callParams,
        operationId,
        options,
        scroll,
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
