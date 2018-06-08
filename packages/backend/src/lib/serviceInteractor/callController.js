const buildOperationId = require('common/src/buildOperationId')

module.exports = function callController({
  connectors,
  operationType,
  request,
  resource,
}) {
  if (!resource) {
    throw new Error('Resource is required')
  }
  if (!connectors) {
    throw new Error('Connectors not added to serviceInteractor')
  }

  const operationId = buildOperationId({
    operationType,
    resource,
  })

  const connector = connectors[operationId]
  if (!connector) {
    throw new Error(
      `No connector found for resource: ${resource} and operationType: ${
        operationType
      }`
    )
  }

  const { controller } = connector
  if (!controller) {
    throw new Error(
      `No controller found for resource: ${resource} and operationType: ${
        operationType
      }`
    )
  }
  return controller({
    request,
  })
}
