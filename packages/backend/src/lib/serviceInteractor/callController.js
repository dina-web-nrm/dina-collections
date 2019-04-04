const buildOperationId = require('common/src/buildOperationId')

module.exports = function callController({
  controllers,
  operationId: operationIdInput,
  operationType,
  request,
  requestId,
  resource,
  user,
}) {
  if (!resource && !operationIdInput) {
    throw new Error('Resource or operationId is required')
  }
  if (!controllers) {
    throw new Error('Connectors not added to serviceInteractor')
  }

  const operationId =
    operationIdInput ||
    buildOperationId({
      operationType,
      resource,
    })

  const controller = controllers[operationId]
  if (!controller) {
    throw new Error(
      `No controller found for operationId: ${operationId} resource: ${resource} and operationType: ${operationType}`
    )
  }

  return controller({
    request,
    requestId,
    user,
  })
}
