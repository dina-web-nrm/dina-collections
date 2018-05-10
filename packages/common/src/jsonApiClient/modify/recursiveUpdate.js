const createLog = require('../../log')
const { Dependor } = require('../../Dependor')

const { modifyRelationshipResources } = require('./modifyRelationshipResources')
const { updateWithRelationships } = require('./updateWithRelationships')
const { updateRelationships } = require('./updateRelationships')

const dep = new Dependor({
  modifyRelationshipResources,
  updateRelationships,
  updateWithRelationships,
})

const defaultLog = createLog('common:jsonApiClient:recursiveUpdate')

function recursiveUpdate(
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

    if (!id) {
      throw new Error('id is required')
    }

    if (!resourceType) {
      throw new Error('resourceType is required')
    }

    if (resourceType !== type) {
      throw new Error(
        `wrong item type: ${type} for resourceType: ${resourceType}`
      )
    }

    log.debug(`recursiveUpdate resource: ${resourceType}. item:`, item)

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

        return dep.updateWithRelationships({
          item: itemWithUpdatedRelationships,
          log: log.scope(),
          openApiClient,
          relationshipKeysToIncludeInBody,
          resourcesToModify,
        })
      })
  })
}

module.exports = {
  dep,
  recursiveUpdate,
}
