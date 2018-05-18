const createLog = require('../../../log')
const { Dependor } = require('../../../Dependor')
const buildOperationId = require('../../../buildOperationId')

const { updateRelationships } = require('../updateRelationships')

const dep = new Dependor({
  buildOperationId,
  updateRelationships,
})

const defaultLog = createLog('common:jsonApiClient:create')

function create(
  { item, log = defaultLog, openApiClient, resourcesToModify } = {}
) {
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

    if (!resourcesToModify) {
      throw new Error('resourcesToModify is required')
    }

    if (!resourcesToModify.includes(item.type)) {
      throw new Error(
        `resource: ${
          item.type
        } is not included in resourcesToModify: [${resourcesToModify.join(
          ', '
        )}]`
      )
    }

    const { relationships, type } = item

    const operationId = dep.buildOperationId({
      operationType: 'create',
      resource: type,
    })
    const input = {
      body: {
        data: item,
      },
    }

    if (!relationships || !Object.keys(relationships).length) {
      delete input.body.data.relationships
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
