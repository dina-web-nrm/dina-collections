const createLog = require('../../../log')
const { Dependor } = require('../../../Dependor')

const {
  modifyIncludedRelationshipItem,
} = require('./modifyIncludedRelationshipItem')
const {
  modifyIncludedRelationshipItems,
} = require('./modifyIncludedRelationshipItems')

const dep = new Dependor({
  modifyIncludedRelationshipItem,
  modifyIncludedRelationshipItems,
})

const defaultLog = createLog('common:jsonApiClient:modifyIncludedRelationship')

function modifyIncludedRelationship({
  includesToModify,
  log = defaultLog,
  openApiClient,
  parentPath,
  relationKey,
  relationship,
  relationshipsToModify,
  resourcePath,
}) {
  return Promise.resolve().then(() => {
    if (!relationship) {
      throw new Error('provide relationship')
    }

    if (relationship.data === undefined) {
      throw new Error('provide relationship.data')
    }

    const isArray = Array.isArray(relationship.data)

    if (isArray) {
      return dep
        .modifyIncludedRelationshipItems({
          includesToModify,
          items: relationship.data,
          log,
          openApiClient,
          parentPath,
          relationKey,
          relationshipsToModify,
          resourcePath,
        })
        .then(updatedItems => {
          return {
            data: updatedItems,
          }
        })
    }
    return dep
      .modifyIncludedRelationshipItem({
        includesToModify,
        item: relationship.data,
        log: log.scope(
          `${parentPath} -> modifyIncludedRelationshipItem for ${resourcePath}`
        ),
        openApiClient,
        relationKey,
        relationshipsToModify,
        resourcePath,
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
  modifyIncludedRelationship,
}
