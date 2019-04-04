const createOperationMapFromServices = require('../../services/utilities/createOperationMapFromServices')
const createCustomControllerMapFromServices = require('../../services/utilities/createCustomControllerMapFromServices')
const initializeController = require('./initializeController')

module.exports = function initializeControllers({
  config,
  fileInteractor,
  integrations,
  models,
  serviceInteractor,
  services,
}) {
  return Promise.resolve().then(() => {
    const controllers = {}
    const operationMap = createOperationMapFromServices(services)
    const customControllerFactories = createCustomControllerMapFromServices(
      services
    )
    Object.keys(operationMap).forEach(operationId => {
      const operation = operationMap[operationId]
      const controller = initializeController({
        config,
        customControllerFactories,
        fileInteractor,
        integrations,
        models,
        operation,
        operationId,
        serviceInteractor,
      })
      controllers[operationId] = controller
    })
    return controllers
  })
}
