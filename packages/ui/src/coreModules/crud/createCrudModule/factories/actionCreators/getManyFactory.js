import { execute as batchExecute } from 'common/src/batch'
import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'
import getActionActionTypes from './utilities/getActionActionTypes'
import dispatchIncludedActions from './dispatchIncludedActions'

export const dep = new Dependor({
  getActionActionTypes,
})

const log = createLog('coreModules:crud:actionCreators:getMany')

export default function getManyAcFactory({
  actionTypes,
  operationId,
  operationType,
  resource,
  resourceActionTypes,
} = {}) {
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

  return function getManyAc({
    ids,
    include,
    isLookup, // TODO - remove this
    limit,
    numberOfEntriesEachBatch = 5000,
    queryParams: queryParamsInput = {},
    relationships,
    removeFromState = false,
    storeInState = true,
    throwError = true,
  } = {}) {
    if (removeFromState) {
      if (include || relationships) {
        throw new Error(
          'Not supported to remove from state with includes or relationship'
        )
      }
    }
    log.debug(`${resource}.getMany called`, {
      queryParamsInput,
      relationships,
      throwError,
    })

    let queryParams = {
      limit: limit || 1000,
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

    const maxNumberOfBatches = 100
    return (dispatch, getState, { apiClient }) => {
      dispatch({
        meta: callParams,
        type: operationActionTypes.request,
      })
      let lastBatchIncluded
      let lastBatchItems
      let lastBatchCallParams
      let isLastBatch = false
      return batchExecute({
        createBatch: ({ batchNumber, numberOfBatchEntries, startCount }) => {
          lastBatchCallParams = {
            ...callParams,
            batchNumber,
            queryParams: {
              ...callParams.queryParams,
              limit: numberOfBatchEntries,
              offset: startCount,
            },
          }
          return apiClient
            .getMany(resource, lastBatchCallParams)
            .then(response => {
              lastBatchIncluded = response.included
              lastBatchItems = response.data
              isLastBatch =
                lastBatchItems && lastBatchItems.length !== numberOfBatchEntries
              return lastBatchItems
            })
        },
        execute: items => {
          if (lastBatchIncluded) {
            dispatchIncludedActions({
              actionTypes,
              dispatch,
              included: lastBatchIncluded,
            })
          }
          dispatch({
            meta: {
              ...lastBatchCallParams,
              isLastBatch,
              removeFromState,
              storeInState,
            },
            payload: items,
            type: operationActionTypes.success,
          })
          return items
        },
        maxNumberOfBatches,
        numberOfEntries: queryParams.limit,
        numberOfEntriesEachBatch,
      }).then(
        () => {
          return lastBatchItems
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
