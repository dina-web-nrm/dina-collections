const createLog = require('../../log')
const { Dependor } = require('../../Dependor')

const { modifyRelationshipResources } = require('./modifyRelationshipResources')
const { updateRelationships } = require('./updateRelationships')
const { create } = require('./create')

const dep = new Dependor({
  create,
  modifyRelationshipResources,
  updateRelationships,
})

const defaultLog = createLog('common:jsonApiClient:recursiveCreate')

function recursiveCreate(
  {
    item,
    log = defaultLog,
    openApiClient,
    resourcesToModify,
    resourceType,
  } = {}
) {
  return Promise.resolve().then(() => {
    if (!openApiClient) {
      throw new Error('provide openApiClient')
    }

    if (!item) {
      throw new Error('item is required')
    }

    const { attributes, id, relationships, type } = item

    if (!type) {
      throw new Error('item type is required')
    }

    if (id) {
      throw new Error('id not allowed')
    }

    if (!resourceType) {
      throw new Error('resourceType is required')
    }

    if (resourceType !== type) {
      throw new Error(
        `wrong item type: ${type} for resourceType: ${resourceType}`
      )
    }

    log.debug(`start recursiveCreate resource: ${resourceType}. item:`, item)

    return dep
      .modifyRelationshipResources({
        log: log.scope(),
        openApiClient,
        relationships,
        resourcesToModify,
      })
      .then(updatedRelationships => {
        const itemWithoutRelationships = {
          attributes,
          type,
        }
        log.debug(
          `modifyRelationshipResources done. itemWithoutRelationships:`,
          itemWithoutRelationships
        )

        return dep
          .create({
            item: itemWithoutRelationships,
            log: log.scope(),
            openApiClient,
            resourcesToModify,
          })
          .then(response => {
            const createdItem = response.data
            log.debug(`create done. createdItem:`, createdItem)
            return dep
              .updateRelationships({
                item: createdItem,
                log: log.scope(),
                openApiClient,
                relationships: updatedRelationships,
              })
              .then(() => {
                log.debug(`updateRelationships done. returning:`, createdItem)
                return createdItem
              })
          })
      })
  })
}

module.exports = {
  dep,
  recursiveCreate,
}
