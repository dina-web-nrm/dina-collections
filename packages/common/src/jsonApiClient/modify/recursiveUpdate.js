const createLog = require('../../log')
const { Dependor } = require('../../Dependor')

const { modifyRelationshipResources } = require('./modifyRelationshipResources')
const { update } = require('./update')
const { updateRelationships } = require('./updateRelationships')

const dep = new Dependor({
  modifyRelationshipResources,
  update,
  updateRelationships,
})

const defaultLog = createLog('common:jsonApiClient:recursiveUpdate')

function recursiveUpdate(
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
        const itemWithoutRelationships = {
          attributes,
          id,
          type,
        }

        return dep
          .update({
            item: itemWithoutRelationships,
            log: log.scope(),
            openApiClient,
            resourcesToModify,
          })
          .then(response => {
            const updatedItem = response.data
            return dep
              .updateRelationships({
                item: updatedItem,
                log: log.scope(),
                openApiClient,
                relationships: updatedRelationships,
              })
              .then(() => {
                return updatedItem
              })
          })
      })
  })
}

module.exports = {
  dep,
  recursiveUpdate,
}
