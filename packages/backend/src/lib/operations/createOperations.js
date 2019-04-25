const createLog = require('../../utilities/log')
const operationFactories = require('./factories')

const defaultLog = createLog('lib/operations')

const initializeController = ({
  config,
  fileInteractor,
  integrations,
  models,
  operationSpecification,
  serviceInteractor,
}) => {
  const {
    connect,
    controller: customControllerKey,
    controllerFactory: customControllerFactory,
    operationType,
  } = operationSpecification

  let controllerFactory

  if (customControllerFactory) {
    controllerFactory = customControllerFactory
  } else if (connect || customControllerKey) {
    controllerFactory =
      operationFactories[operationType] &&
      operationFactories[operationType].controllerFactory
  }

  if (!controllerFactory) {
    // log.warning(`Missing controller factory for operationId: ${operationId}`)
    return null
  }

  const controller =
    controllerFactory &&
    controllerFactory({
      config,
      fileInteractor,
      integrations,
      models,
      operationSpecification,
      serviceInteractor,
    })
  return controller
}

module.exports = function createOperations({
  config,
  fileInteractor,
  integrations,
  log = defaultLog,
  models,
  operationSpecifications,
  serviceInteractor,
}) {
  log.info('creating operations from operationSpecifications')
  log.scope().info('creating controllers')
  return Promise.resolve().then(() => {
    const operations = {}
    operationSpecifications.forEach(operationSpecification => {
      const { operationId } = operationSpecification
      const controller = initializeController({
        config,
        fileInteractor,
        integrations,
        models,
        operationId,
        operationSpecification,
        serviceInteractor,
      })
      const operation = {
        controller,
        operationSpecification,
      }
      operations[operationId] = operation
    })
    return operations
  })
}
