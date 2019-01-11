const createLog = require('../../../log')
const { Dependor } = require('../../../Dependor')

const buildOperationId = require('../../../buildOperationId')

const dep = new Dependor({
  buildOperationId,
})

const defaultLog = createLog('common:jsonApiClient:update')

function update(
  {
    openApiClient,
    item,
    log = defaultLog,
    resourcesToModify,
    resourcePath,
  } = {}
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

    if (!item.id) {
      throw new Error('id is required')
    }

    if (
      !(item.attributes && Object.keys(item.attributes).length) &&
      !(item.relationships && Object.keys(item.relationships).length)
    ) {
      return {
        data: item,
      }
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

    const { id, relationships, type } = item

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

    if (!relationships || !Object.keys(relationships).length) {
      delete input.body.data.relationships
    }

    log.debug(
      `${resourcePath} -> Update resource with id: ${
        id
      } through openApiClien: ${operationId}, input:`,
      input
    )

    return openApiClient.call(operationId, input)
  })
}

module.exports = {
  dep,
  update,
}
