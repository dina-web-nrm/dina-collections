const createLog = require('../../utilities/log')
const callController = require('./callController')

const log = createLog('lib/serviceInteractor')

module.exports = function createServiceInteractor() {
  const operationTypes = [
    'batchCreate',
    'create',
    'del',
    'emptyView',
    'getMany',
    'getOne',
    'importDataFromFile',
    'rebuildView',
    'requestUpdateView',
    'update',
    'updateView',
  ]

  let connectors = null
  const addConnectors = connectorsInput => {
    log.info(`Adding connectors`)
    connectors = connectorsInput
  }

  const call = ({ operationId, request = {}, requestId, user }) => {
    return Promise.resolve().then(() => {
      return callController({
        connectors,
        log,
        operationId,
        request,
        requestId,
        user,
      })
    })
  }

  const detachedCall = ({ operationId, request = {}, requestId, user }) => {
    return Promise.resolve().then(() => {
      return callController({
        connectors,
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

  const serviceInteractions = operationTypes.reduce(
    (methods, operationType) => {
      log.info(`Creating service interaction for operation: ${operationType}`)

      return {
        ...methods,
        [operationType]: ({ request = {}, requestId, resource, user }) => {
          return Promise.resolve().then(() => {
            return callController({
              connectors,
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

  return { ...serviceInteractions, addConnectors }
}
