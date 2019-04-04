const controllerFactories = require('../index.js')
const createLog = require('../../../utilities/log')

const log = createLog('lib/controllers/initializeController')

module.exports = function initializeController({
  config,
  customControllerFactories,
  fileInteractor,
  integrations,
  models,
  operation,
  operationId,
  serviceInteractor,
}) {
  const { connect, controller: customControllerKey, operationType } = operation

  const controllerFactory =
    (connect || customControllerKey) &&
    (customControllerFactories[customControllerKey] ||
      controllerFactories[operationType])

  if (!controllerFactory) {
    log.warn(`Missing controller factory for operationId: ${operationId}`)
    return null
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
  return controller
}
