const createLog = require('../../../../utilities/log')
const operationFactories = require('../../factories')

const defaultLog = createLog('lib/operations')

const initializeController = ({
  config,
  customControllerFactories,
  fileInteractor,
  integrations,
  models,
  operationSpecification,
  serviceInteractor,
}) => {
  const {
    connect,
    controller: customControllerKey,
    operationType,
  } = operationSpecification
  const controllerFactory =
    (connect || customControllerKey) &&
    (customControllerFactories[customControllerKey] ||
      (operationFactories[operationType] &&
        operationFactories[operationType].controllerFactory))

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
  customControllerFactories,
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
        customControllerFactories,
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
