const createLog = require('../../log')
const { Dependor } = require('../../Dependor')

const { modifyRelationshipResources } = require('./modifyRelationshipResources')
const { createWithRelationships } = require('./createWithRelationships')

const dep = new Dependor({
  createWithRelationships,
  modifyRelationshipResources,
})

const defaultLog = createLog('common:jsonApiClient:recursiveCreate')

function recursiveCreate(
  {
    item,
    log = defaultLog,
    openApiClient,
    relationshipKeysToIncludeInBody,
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

    const { id, relationships, type } = item

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

    log.debug('recursiveCreate: start', item)

    return dep
      .modifyRelationshipResources({
        log: log.scope(),
        openApiClient,
        relationships,
        resourcesToModify,
      })
      .then(updatedRelationships => {
        const itemWithUpdatedRelationships = {
          ...item,
          relationships: updatedRelationships,
        }
        log.debug(
          'relationship resources updated. Item with updated relationships:',
          itemWithUpdatedRelationships
        )
        return dep
          .createWithRelationships({
            item: itemWithUpdatedRelationships,
            log: log.scope(),
            openApiClient,
            relationshipKeysToIncludeInBody,
            resourcesToModify,
          })
          .then(result => {
            log.debug('recursiveCreate: done', result)
            return result
          })
      })
  })
}

module.exports = {
  dep,
  recursiveCreate,
}
