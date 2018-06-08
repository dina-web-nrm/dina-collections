const createLog = require('../../utilities/log')
const callController = require('./callController')

const log = createLog('lib/serviceInteractor')

module.exports = function createServiceInteractor() {
  const operationTypes = [
    'batchCreate',
    'create',
    'del',
    'getMany',
    'getOne',
    'getOneSync',
    'getVersion',
    'getVersions',
    'rebuildView',
    'update',
  ]

  let connectors = null
  const addConnectors = connectorsInput => {
    log.info(`Adding connectors`)
    connectors = connectorsInput
  }

  const serviceInteractions = operationTypes.reduce(
    (methods, operationType) => {
      log.info(`Creating service interaction for operation: ${operationType}`)

      return {
        ...methods,
        [operationType]: ({ resource, request = {}, sync = false }) => {
          if (sync) {
            return callController({
              connectors,
              log,
              operationType,
              request,
              resource,
            })
          }
          return Promise.resolve().then(() => {
            return callController({
              connectors,
              log,
              operationType,
              request,
              resource,
            })
          })
        },
      }
    },
    {}
  )

  return { ...serviceInteractions, addConnectors }
}
