const buildOperationId = require('common/src/buildOperationId')

module.exports = function requestRebuildView({
  operation,
  models,
  serviceInteractor,
}) {
  const { resource } = operation
  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  const rebuildViewOperationId = buildOperationId({
    operationType: 'rebuildView',
    resource,
  })

  if (!rebuildViewOperationId) {
    throw new Error(
      `No operationId found for operation rebuildView and resource: ${resource}`
    )
  }

  return ({ request }) => {
    const {
      body: { attributes: { operationRequest = {} } = {} } = {},
    } = request

    return serviceInteractor.call({
      operationId: 'jobCreate',
      request: {
        body: {
          data: {
            attributes: {
              operationId: rebuildViewOperationId,
              operationRequest,
            },
          },
        },
      },
    })
  }
}
