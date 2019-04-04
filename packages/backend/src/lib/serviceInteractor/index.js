const buildOperationId = require('common/src/buildOperationId')
const createLog = require('../../utilities/log')
const callController = require('./callController')
const {
  createResourceBatchExecute,
  createResourceBatchUpdate,
} = require('./virtualOperations')

const log = createLog('lib/serviceInteractor')

module.exports = function createServiceInteractor() {
  const operationTypes = [
    'create',
    'del',
    'emptyView',
    'getMany',
    'getOne',
    'importDataFromFile',
    'query',
    'rebuildView',
    'requestUpdateView',
    'update',
    'updateView',
    'validate',
  ]

  let controllers = null
  const addControllers = controllersInput => {
    log.info(`Adding controllers`)
    controllers = controllersInput
  }

  const call = ({
    operationId: operationIdInput,
    operationType,
    request = {},
    requestId,
    resource,
    user,
  }) => {
    const operationId =
      operationIdInput ||
      buildOperationId({
        operationType,
        resource,
      })
    return Promise.resolve().then(() => {
      return callController({
        controllers,
        log,
        operationId,
        request,
        requestId,
        user,
      })
    })
  }

  const detachedCall = ({
    operationId: operationIdInput,
    operationType,
    request = {},
    requestId,
    resource,
    user,
  }) => {
    const operationId =
      operationIdInput ||
      buildOperationId({
        operationType,
        resource,
      })

    return Promise.resolve().then(() => {
      return callController({
        controllers,
        log,
        operationId: 'jobCreate',
        request: {
          body: {
            data: {
              attributes: {
                operationId,
                operationRequest: request,
              },
            },
          },
        },
        requestId,
        user,
      })
    })
  }

  const virtualOperations = {
    resourceBatchExecute: createResourceBatchExecute({
      call,
    }),
    resourceBatchUpdate: createResourceBatchUpdate({
      call,
    }),
  }

  const serviceInteractions = operationTypes.reduce(
    (methods, operationType) => {
      return {
        ...methods,
        [operationType]: ({ request = {}, requestId, resource, user }) => {
          return Promise.resolve().then(() => {
            return callController({
              controllers,
              log,
              operationType,
              request,
              requestId,
              resource,
              user,
            })
          })
        },
      }
    },
    { call, detachedCall }
  )

  return { ...serviceInteractions, ...virtualOperations, addControllers }
}
