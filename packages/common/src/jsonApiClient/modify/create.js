const createLog = require('../../log')
const { Dependor } = require('../../Dependor')
const buildOperationId = require('../../buildOperationId')

const dep = new Dependor({
  buildOperationId,
})

const defaultLog = createLog('common:jsonApiClient:create')

function create({ openApiClient, item, log = defaultLog } = {}) {
  return Promise.resolve().then(() => {
    if (!openApiClient) {
      throw new Error('provide openApiClient')
    }

    if (!item) {
      throw new Error('item required')
    }

    if (!item.type) {
      throw new Error('type is required')
    }

    if (item.id) {
      throw new Error('not allowed to create with id')
    }

    const { type } = item
    const operationId = dep.buildOperationId({
      operationType: 'create',
      resource: type,
    })
    const input = {
      body: { data: item },
    }
    log.debug(
      `Create resource ${type} with operationId: ${operationId} input:`,
      input
    )

    return openApiClient.call(operationId, input)
  })
}

module.exports = {
  create,
  dep,
}
