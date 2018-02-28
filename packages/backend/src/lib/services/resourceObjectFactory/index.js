const createResourceSpecification = require('./createResourceSpecification')
const createOperationObject = require('../operationObjectFactory')

const createOperationMap = operations => {
  return operations.reduce((map, operation) => {
    const { operationId } = operation
    return {
      ...map,
      [operationId]: operation,
    }
  }, {})
}

module.exports = function createResourceObject(resourceSpecificationInput) {
  const resourceSpecification = createResourceSpecification(
    resourceSpecificationInput
  )
  const {
    basePath,
    operations: operationSpecifications = [],
    relations,
    resource,
  } = resourceSpecification

  const resourcePlural = `${resource}`

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
    operationIds,
    operationMap,
    relations,
    resource,
    resourcePlural,
  }
}
