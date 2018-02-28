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

  const { type } = operationSpecification

  const typeFactory = typeFactories[type]

  if (!typeFactory) {
    throw new Error(`Type: ${type} unknown for...`)
  }

  return typeFactory(operationSpecification)
}
