const createRequestHandler = require('common/src/apiClient/createRequestHandler')
const commonCreateEndpointConfig = require('common/src/endpointFactory/server')
const controllerFactories = require('../controllers')
const createLog = require('../../utilities/log')

const log = createLog('lib/connectors', 1)

module.exports = function createConnector({
  apiConfig,
  customControllerFactories,
  elasticModels,
  integrations,
  models,
  operation,
  operationId,
  serviceName,
}) {
  log.info(operationId)
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
    log
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
      elasticModels,
      integrations,
      models,
      operation,
    })
  const endpointConfig = commonCreateEndpointConfig({
    operationId,
  })

  // TODO rename function
  const requestHandler = createRequestHandler({
    apiConfig,
    endpointConfig,
    handler: controller,
    methodConfigInput: {
      method,
      requestContentType: 'application/vnd.api+json',
      responseContentType: 'application/vnd.api+json',
    },
  })

  return {
    controller,
    method,
    path,
    requestHandler,
    serviceName,
  }
}
