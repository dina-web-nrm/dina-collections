const createLog = require('../../../log')
const { Dependor } = require('../../../Dependor')

const { modifyRelatedResourceItem } = require('./modifyRelatedResourceItem')
const { modifyRelatedResourceItems } = require('./modifyRelatedResourceItems')

const dep = new Dependor({
  modifyRelatedResourceItem,
  modifyRelatedResourceItems,
})

const defaultLog = createLog('common:jsonApiClient:modifyRelationshipResource')

function modifyRelationshipResource({
  log = defaultLog,
  openApiClient,
  relationKey,
  relationship,
  resourcesToModify,
}) {
  return Promise.resolve().then(() => {
    if (!relationship) {
      throw new Error('provide relationship')
    }

    if (relationship.data === undefined) {
      throw new Error('provide relationship.data')
    }
    const isArray = Array.isArray(relationship.data)
    log.debug(
      `${relationKey} (${isArray ? 'array' : 'object'})`,
      relationship.data
    )
    if (isArray) {
      return dep
        .modifyRelatedResourceItems({
          items: relationship.data,
          log: log.scope(),
          openApiClient,
          relationKey,
          resourcesToModify,
        })
        .then(updatedItems => {
          return {
            data: updatedItems,
          }
        })
    }
    return dep
      .modifyRelatedResourceItem({
        item: relationship.data,
        log: log.scope(),
        openApiClient,
        relationKey,
        resourcesToModify,
      })
      .then(updatedItem => {
        return {
          data: updatedItem,
        }
      })
  })
}

module.exports = {
  dep,
  modifyRelationshipResource,
}
