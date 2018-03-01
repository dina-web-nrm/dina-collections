const createResourceSpecification = require('./createResourceSpecification')
const createOperationObject = require('../operationObjectFactory')
const createOperationMap = require('./createOperationMap')

module.exports = function createResource(resourceSpecificationInput) {
  const resourceSpecification = createResourceSpecification(
    resourceSpecificationInput
  )

  const {
    basePath,
    controllers,
    operations: operationSpecifications = [],
    relations,
    resource,
  } = resourceSpecification

  const operations = operationSpecifications.map(operationSpecification => {
    return createOperationObject({
      operationSpecification,
      resourceSpecification,
    })
  })
  const operationMap = createOperationMap(operations)
  const operationIds = Object.keys(operationMap)

  return {
    basePath,
    controllers,
    operationIds,
    operations: operationMap,
    relations,
    resource,
  }
}
