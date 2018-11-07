const createRequestHandler = require('common/src/apiClient/createRequestHandler')
const commonCreateEndpointConfig = require('common/src/endpointFactory/server')
const controllerFactories = require('../../lib/controllers')
const createLog = require('../../utilities/log')

const log = createLog('lib/connectors', 1)

module.exports = function createConnector({
  apiConfig,
  config,
  customControllerFactories,
  fileInteractor,
  integrations,
  models,
  operation,
  operationId,
  serviceInteractor,
  serviceName,
}) {
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
      .warning(
        `no controller for ${operationId}. operationType: ${
          operationType
        }, connect: ${connect}, customControllerKey: ${customControllerKey}`
      )
  }

  const controller =
    controllerFactory &&
    controllerFactory({
      config,
      fileInteractor,
      integrations,
      models,
      operation,
      serviceInteractor,
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
