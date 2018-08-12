const buildOperationId = require('common/src/buildOperationId')

module.exports = function callController({
  connectors,
  operationId: operationIdInput,
  operationType,
  request,
  resource,
}) {
  if (!resource && !operationIdInput) {
    throw new Error('Resource or operationId is required')
  }
  if (!connectors) {
    throw new Error('Connectors not added to serviceInteractor')
  }

  const operationId =
    operationIdInput ||
    buildOperationId({
      operationType,
      resource,
    })

  const connector = connectors[operationId]
  if (!connector) {
    throw new Error(
      `No connector found for operationId: ${operationId} resource: ${
        resource
      } and operationType: ${operationType}`
    )
  }

  const { requestHandler } = connector
  if (!requestHandler) {
    throw new Error(
      `No controller found for operationId: ${operationId} resource: ${
        resource
      } and operationType: ${operationType}`
    )
  }
  return requestHandler({
    userInput: request,
  })
}
