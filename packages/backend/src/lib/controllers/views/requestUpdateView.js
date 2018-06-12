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
  const updateViewOperationId = buildOperationId({
    operationType: 'updateView',
    resource,
  })

  if (!updateViewOperationId) {
    throw new Error(
      `No operationId found for operation rebuildView and resource: ${resource}`
    )
  }
  return ({ request }) => {
    const { body } = request
    const { data: { attributes: { ids } = {} } = {} } = body
    if (!ids && ids.length) {
      throw new Error('Ids required')
    }

    return serviceInteractor.call({
      operationId: 'jobCreate',
      request: {
        body: {
          data: {
            attributes: {
              operationId: updateViewOperationId,
              operationRequest: {
                body,
              },
            },
          },
        },
      },
    })
  }
}
