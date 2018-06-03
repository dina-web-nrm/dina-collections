const buildOperationId = require('common/src/buildOperationId')

module.exports = function getItemByTypeId({ connectors, id, type }) {
  return Promise.resolve().then(() => {
    const operationId = buildOperationId({
      operationType: 'getOne',
      resource: type,
    })

    if (!operationId) {
      throw new Error(`No operationId for operation getOne and type: ${type}`)
    }

    const operation = connectors[operationId]
    if (!operation) {
      throw new Error(`No operation found for operationId ${operationId}`)
    }

    const { controller } = operation
    if (!controller) {
      throw new Error(`No controller found for operationId ${operationId}`)
    }

    return controller({
      pathParams: {
        id,
      },
    })
  })
}
