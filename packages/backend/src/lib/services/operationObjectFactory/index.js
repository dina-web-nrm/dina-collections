const createOperationObjectSpecification = require('./createOperationObjectSpecification')
const typeFactories = require('./typeFactories')

module.exports = function createOperationObject({
  log,
  operationSpecification: operationSpecificationInput,
  resourceSpecification,
}) {
  if (operationSpecificationInput.raw) {
    return operationSpecificationInput
  }
  const operationSpecification = createOperationObjectSpecification({
    operationSpecificationInput,
    resourceSpecification,
  })

  const { type, factory } = operationSpecification

  log.info(`${type}`)

  const typeFactory = factory || typeFactories[type]

  if (!typeFactory) {
    throw new Error(`Type: ${type} unknown for...`)
  }

  return typeFactory(operationSpecification)
}
