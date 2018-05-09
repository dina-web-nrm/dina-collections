const createLog = require('../../log')
const { Dependor } = require('../../Dependor')

const buildOperationId = require('../../buildOperationId')

const dep = new Dependor({
  buildOperationId,
})

const defaultLog = createLog('common:jsonApiClient:update')

function update({ openApiClient, item, log = defaultLog } = {}) {
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

    if (!item.id) {
      throw new Error('id is required')
    }

    if (!(item.attributes && Object.keys(item.attributes).length)) {
      throw new Error('attributes are required')
    }

    const { id, type } = item
    const operationId = dep.buildOperationId({
      operationType: 'update',
      resource: type,
    })

    const input = {
      body: { data: item },
      pathParams: {
        id,
      },
    }
    log.debug(
      `Create resource ${type} with operationId: ${operationId} input:`,
      input
    )

    return openApiClient.call(operationId, input)
  })
}

module.exports = {
  dep,
  update,
}
