const createOperationObjectSpecification = require('./createOperationObjectSpecification')
const typeFactories = require('./typeFactories')

module.exports = function createOperationObject({
  operationSpecification: operationSpecificationInput,
  resourceSpecification,
}) {
  const operationSpecification = createOperationObjectSpecification({
    operationSpecificationInput,
    resourceSpecification,
  })

  const { type, factory } = operationSpecification

  const typeFactory = factory || typeFactories[type]

  if (!typeFactory) {
    throw new Error(`Type: ${type} unknown for...`)
  }

  return typeFactory(operationSpecification)
}
