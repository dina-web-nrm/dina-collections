const createLog = require('../../log')
const { Dependor } = require('../../Dependor')

const { modifyIncludes } = require('./modifyIncludes')
const { updateWithRelationships } = require('./updateWithRelationships')
const { updateRelationships } = require('./updateRelationships')

const dep = new Dependor({
  modifyIncludes,
  updateRelationships,
  updateWithRelationships,
})

const defaultLog = createLog('common:jsonApiClient:recursiveUpdate')

function recursiveUpdate({
  includesToModify,
  item,
  log = defaultLog,
  openApiClient,
  relationshipsToModify,
  resourcePath: resourcePathInput,
  resourceType,
} = {}) {
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

    const resourcePath = resourcePathInput || resourceType

    log.debug(`${resourcePath} -> recursiveUpdate, id: ${item.id}`, item)

    return dep
      .modifyIncludes({
        includesToModify,
        log: log.scope(`${resourcePath} -> modifyIncludes`),
        openApiClient,
        relationships,
        relationshipsToModify,
        resourcePath,
      })
      .then(updatedRelationships => {
        const itemWithUpdatedRelationships = {
          ...item,
          relationships: updatedRelationships,
        }

        return dep
          .updateWithRelationships({
            item: itemWithUpdatedRelationships,
            log: log.scope(`${resourcePath} -> updateWithRelationships`),
            openApiClient,
            relationshipsToModify,
            resourcePath,
          })
          .then(result => {
            return result
          })
      })
  })
}

module.exports = {
  dep,
  recursiveUpdate,
}
