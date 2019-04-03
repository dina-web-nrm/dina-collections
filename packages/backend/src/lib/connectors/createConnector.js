const controllerFactories = require('../../lib/controllers')
const createLog = require('../../utilities/log')

const log = createLog('lib/connectors', 1)

module.exports = function createConnector({
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
        `no controller for ${operationId}. operationType: ${operationType}, connect: ${connect}, customControllerKey: ${customControllerKey}`
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
  return {
    controller,
    method,
    path,
    requestHandler: ({ user, userInput, requestId }) => {
      return controller({
        request: userInput,
        requestId,
        user,
      })
    },
    serviceName,
  }
}
