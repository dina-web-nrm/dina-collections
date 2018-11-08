const createResourceSpecification = require('./createResourceSpecification')
const createOperation = require('../operationFactory')
const createOperationMap = require('./createOperationMap')

module.exports = function createResource({ resourceInput }) {
  const resourceSpecification = createResourceSpecification(resourceInput)
  const {
    basePath,
    controllers,
    model,
    operations: operationSpecifications = [],
    relations,
    resource,
  } = resourceSpecification

  const operations = operationSpecifications.map(operationSpecification => {
    return createOperation({
      operationSpecification,
      resourceSpecification,
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
