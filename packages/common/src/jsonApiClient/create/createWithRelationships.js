const createLog = require('../../log')
const { Dependor } = require('../../Dependor')
const buildOperationId = require('../../buildOperationId')
const updateRelationships = require('./updateRelationships')

const dep = new Dependor({
  buildOperationId,
  updateRelationships,
})

const log = createLog('common:jsonApiClient', 1)

function createWithRelationships({ openApiClient, item }) {
  const { id, relationships, type } = item
  log.debug(`createWithRelationships (${type}). relationships: `, relationships)
  return dep
    .updateRelationships({
      createWithRelationships,
      openApiClient,
      relationships,
    })
    .then(updatedRelationships => {
      log
        .scope()
        .debug(
          `Updating resource(${type}) with updatedRelationships: `,
          updatedRelationships
        )
      const updatedItem = {
        ...item,
        relationships: updatedRelationships,
      }
      if (id) {
        log.scope().debug(`Updating resource with id: ${id}`)
        return openApiClient.call(
          dep.buildOperationId({
            operationType: 'update',
            resource: type,
          }),
          {
            body: { data: updatedItem },
            pathParams: {
              id: updatedItem.id,
            },
          }
        )
      }
      log.scope().debug(`Creating resource with id: ${id}`)
      return openApiClient.call(
        dep.buildOperationId({
          operationType: 'create',
          resource: type,
        }),
        {
          body: { data: updatedItem },
        }
      )
    })
}

module.exports = {
  createWithRelationships,
  dep,
}
