const createOperationSpecification = require('./createOperationSpecification')
const operationFactories = require('../../operations')

module.exports = function createOperationObject({
  operationSpecification: operationSpecificationInput,
  resourceSpecification,
  serviceName,
}) {
  if (operationSpecificationInput.raw) {
    return { serviceName, ...operationSpecificationInput }
  }
  const operationSpecification = createOperationSpecification({
    operationSpecificationInput,
    resourceSpecification,
    serviceName,
  })

  const { type, factory } = operationSpecification

  const typeFactory = factory || operationFactories[type]

  if (!typeFactory) {
    throw new Error(`Type: ${type} unknown for...`)
  }

  return typeFactory(operationSpecification)
}
