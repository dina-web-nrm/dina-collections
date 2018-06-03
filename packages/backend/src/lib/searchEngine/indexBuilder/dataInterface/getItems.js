const buildOperationId = require('common/src/buildOperationId')

module.exports = function getItems({
  connectors,
  limit,
  offset,
  relationships = [],
  type,
}) {
  return Promise.resolve().then(() => {
    const operationId = buildOperationId({
      operationType: 'getMany',
      resource: type,
    })

    if (!operationId) {
      throw new Error(`No operationId for operation getMany and type: ${type}`)
    }

    const operation = connectors[operationId]
    if (!operation) {
      throw new Error(`No operation found for operationId ${operationId}`)
    }

    const { controller } = operation
    if (!controller) {
      throw new Error(`No controller found for operationId ${operationId}`)
    }

    let queryParams = {}
    if (limit !== undefined) {
      queryParams = {
        ...queryParams,
        limit,
      }
    }

    if (offset !== undefined) {
      queryParams = {
        ...queryParams,
        offset,
      }
    }

    if (relationships !== undefined) {
      queryParams = {
        ...queryParams,
        relationships,
      }
    }

    return controller({
      request: {
        queryParams,
      },
    })
  })
}
