const createOperationObjectConfiguration = require('./createOperationObjectConfiguration')
const operations = require('../../../operations')

module.exports = function createOperationSpecification({
  operationConfiguration: operationConfigurationInput,
  resourceSpecification,
  serviceName,
}) {
  if (operationConfigurationInput.raw) {
    return { serviceName, ...operationConfigurationInput }
  }
  const operationConfiguration = createOperationObjectConfiguration({
    operationConfigurationInput,
    resourceSpecification,
    serviceName,
  })

  const { type, operationSpecificationFactory } = operationConfiguration
  const typeFactory =
    operationSpecificationFactory ||
    (operations[type] && operations[type].specificationFactory)

  if (!typeFactory) {
    throw new Error(`Type: ${type} unknown for...`)
  }

  return typeFactory(operationConfiguration)
}
