const createLog = require('../../../utilities/log')
const createResourceSpecification = require('./createResourceSpecification')
const createOperationObject = require('../operationObjectFactory')
const createOperationMap = require('./createOperationMap')

const log = createLog('lib/services', 2)

module.exports = function createResource({ resourceInput }) {
  const resourceSpecification = createResourceSpecification(resourceInput)
  const {
    basePath,
    controllers,
    operations: operationSpecifications = [],
    relations,
    resource,
  } = resourceSpecification

  log.info(`Create operations:`)
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
