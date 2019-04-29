const internalCreateResourceSpecification = require('./createResourceSpecification')
const createOperationSpecification = require('../createOperationSpecification')
const createOperationMap = require('./createOperationMap')
const createModelSpecification = require('../createModelSpecification')

module.exports = function createResourceSpecification({
  basePath: serviceBasePath,
  resourceConfiguration,
  serviceName,
}) {
  const resourceSpecification = internalCreateResourceSpecification({
    resourceConfiguration,
    serviceBasePath,
  })
  const {
    basePath,
    controllers,
    model: modelConfiguration,
    operations: operationConfigurations = [],
    relations,
    resource,
  } = resourceSpecification

  const modelSpecification = createModelSpecification({ modelConfiguration })

  const operationSpecifications = operationConfigurations.map(
    operationConfiguration => {
      return createOperationSpecification({
        operationConfiguration,
        resourceSpecification,
        serviceName,
      })
    }
  )
  const operationMap = createOperationMap(operationSpecifications)
  const operationIds = Object.keys(operationMap)

  return {
    basePath,
    controllers,
    model: modelSpecification,
    operationIds,
    operations: operationMap,
    relations,
    resource,
  }
}
