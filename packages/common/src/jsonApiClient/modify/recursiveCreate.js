const createLog = require('../../log')
const { Dependor } = require('../../Dependor')

const { modifyIncludes } = require('./modifyIncludes')
const { createWithRelationships } = require('./createWithRelationships')

const dep = new Dependor({
  createWithRelationships,
  modifyIncludes,
})

const defaultLog = createLog('common:jsonApiClient:recursiveCreate')

function recursiveCreate({
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

    const resourcePath = resourcePathInput || resourceType

    log.debug(`${resourcePath} -> recursiveCreate`, item)

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
          .createWithRelationships({
            item: itemWithUpdatedRelationships,
            log: log.scope(`${resourcePath} -> createWithRelationships`),
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
  recursiveCreate,
}
