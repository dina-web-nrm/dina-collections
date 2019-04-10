const createResourceSpecification = require('./createResourceSpecification')
const createOperation = require('../operationFactory')
const createOperationMap = require('./createOperationMap')

module.exports = function createResource({ resourceInput, serviceName }) {
  const resourceSpecification = createResourceSpecification(resourceInput)
  const {
    basePath,
    controllers,
    model,
    operations: operationConfigurations = [],
    relations,
    resource,
  } = resourceSpecification

  const operations = operationConfigurations.map(operationConfiguration => {
    return createOperation({
      operationConfiguration,
      resourceSpecification,
      serviceName,
    })
  })
  const operationMap = createOperationMap(operations)
  const operationIds = Object.keys(operationMap)

  return {
    basePath,
    controllers,
    model,
    operationIds,
    operations: operationMap,
    relations,
    resource,
  }
}
