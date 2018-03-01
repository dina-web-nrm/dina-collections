const createRouteFunction = require('common/src/apiClient/createRouteFunction')
const commonCreateEndpointConfig = require('common/src/endpointFactory/server')
const controllerFactories = require('../controllers/factories')
const exportResourcesFromServices = require('./exportResourcesFromServices')
const exportOperationsFromResources = require('./exportOperationsFromResources')

const createLog = require('../../utilities/log')

const log = createLog('lib/connectors/serviceRouterFactory')

module.exports = function createConnectors({ config, models, services }) {
  log.info('Start create connectors')

  const apiConfig = { ...config.api, log: config.log }
  const resources = exportResourcesFromServices(services)
  const operations = exportOperationsFromResources(resources)

  const connectors = Object.keys(operations).reduce((obj, operationId) => {
    log.info(`Creating connector for ${operationId}`)
    const operation = operations[operationId]
    const {
      controllers: customControllerFactories = {},
      method,
      path,
      operationType,
    } = operation
    // TODO make this in one step
    console.log('customControllerFactories', customControllerFactories)
    const controllerFactory =
      customControllerFactories[operationType] ||
      controllerFactories[operationType]
    if (!controllerFactory) {
      /* eslint-disable no-console */
      console.warn(
        `controllerFactory not found for ${operationId} -> ${operationType}`
      )
      /* eslint-enable no-console */
      return obj
    }

    const controller = controllerFactory({
      connectorOptions: operation,
      models,
    })
    const endpointConfig = commonCreateEndpointConfig({
      operationId,
    })

    // TODO rename function
    const requestHandler = createRouteFunction({
      apiConfig,
      endpointConfig,
      handler: controller,
      methodConfigInput: {
        method,
      },
    })
    return {
      ...obj,
      [operationId]: {
        method,
        path,
        requestHandler,
      },
    }
  }, {})

  return Promise.resolve({
    connectors,
  })
}
