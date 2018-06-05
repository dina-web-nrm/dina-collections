const createLog = require('../../utilities/log')
const buildOperationId = require('common/src/buildOperationId')

const log = createLog('lib/serviceInteractor')

module.exports = function createServiceInteractor() {
  const operationTypes = [
    'create',
    'del',
    'getMany',
    'getOne',
    'getVersion',
    'getVersions',
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
        [operationType]: ({ resource, request = {} }) => {
          return Promise.resolve().then(() => {
            if (!resource) {
              throw new Error('Resource is required')
            }
            if (!connectors) {
              throw new Error('Connectors not added to serviceInteractor')
            }

            log.debug(
              `Calling resource: ${resource} and operationType: ${
                operationType
              }`
            )
            const operationId = buildOperationId({
              operationType,
              resource,
            })

            const connector = connectors[operationId]
            if (!connector) {
              throw new Error(
                `No connector found for resource: ${
                  resource
                } and operationType: ${operationType}`
              )
            }

            const { controller } = connector
            if (!controller) {
              throw new Error(
                `No controller found for resource: ${
                  resource
                } and operationType: ${operationType}`
              )
            }

            return controller({
              request,
            })
          })
        },
      }
    },
    {}
  )

  return { ...serviceInteractions, addConnectors }
}
