import createLog from 'utilities/log'
import Dependor from 'utilities/Dependor'
import getActionActionTypes from './utilities/getActionActionTypes'

export const dep = new Dependor({
  getActionActionTypes,
})

const log = createLog('coreModules:crud:actionCreators:query')

const createCallParams = ({ body, options, scroll, scrollId, limit }) => {
  const attributes = body && body.data && body.data.attributes

  return {
    ...options,
    body: {
      data: {
        attributes: {
          ...attributes,
          limit,
          scroll,
          scrollId,
        },
      },
    },
  }
}

const scrollQuery = ({ apiClient, operationId, body, options }) => {
  let lastScrollId
  let lastBatchCallParams
  let nFetchedItems = 0

  const data = []
  const scroll = () => {
    lastBatchCallParams = createCallParams({
      body,
      limit: 3000,
      options,
      scroll: true,
      scrollId: lastScrollId,
    })
    return apiClient.call(operationId, lastBatchCallParams).then(response => {
      const { scrollId, nResponseItems = 0, nTotalItems = 0 } =
        (response && response.meta) || {}
      lastScrollId = scrollId

      nFetchedItems += nResponseItems
      data.push(...response.data)
      if (
        !lastScrollId ||
        nFetchedItems === 0 ||
        nFetchedItems >= nTotalItems
      ) {
        return {
          ...response,
          data,
        }
      }

      return scroll()
    })
  }

  return scroll()
}

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

      const callParams = createCallParams({
        body,
        limit: 1000,
        options,
        scroll: true,
        scrollId: undefined,
      })
      dispatch({
        meta: callParams,
        type: actionTypes.request,
      })
      return scrollQuery({
        apiClient,
        body,
        operationId,
        options,
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
