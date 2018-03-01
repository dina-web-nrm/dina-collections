const createRouteFunction = require('common/src/apiClient/createRouteFunction')
const commonCreateEndpointConfig = require('common/src/endpointFactory/server')
const controllerFactories = require('../controllers/factories')
const extractResourcesFromServices = require('./extractResourcesFromServices')
const extractOperationsFromResources = require('./extractOperationsFromResources')
const extractCustomControllersFromServices = require('./extractCustomControllersFromServices')

const createLog = require('../../utilities/log')

const log = createLog('lib/connectors')

module.exports = function createConnectors({ config, models, services }) {
  log.info('Create connectors')

  const apiConfig = { ...config.api, log: config.log }
  const resources = extractResourcesFromServices(services)
  const operations = extractOperationsFromResources(resources)
  const customControllerFactories = extractCustomControllersFromServices(
    services
  )
  const scopedLog = log.scope()
  const connectors = Object.keys(operations).reduce((obj, operationId) => {
    scopedLog.info(`${operationId}`)
    const operation = operations[operationId]
    const {
      connect,
      controller: customControllerKey,
      method,
      path,
      operationType,
    } = operation

    const controllerFactory =
      (connect || customControllerKey) &&
      (customControllerFactories[customControllerKey] ||
        controllerFactories[operationType])

    if (!controllerFactory) {
      scopedLog
        .scope()
        .info(
          `no controller for ${operationId}. operationType: ${
            operationType
          }, connect: ${connect}, customControllerKey: ${customControllerKey}`
        )
    }

    const controller =
      controllerFactory &&
      controllerFactory({
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
