const { getRelationshipItems } = require('./utilities/getRelationshipItems')
const { resolveByPath } = require('./utilities/resolveByPath')
const {
  resolveRelationshipDataArray,
} = require('./utilities/resolveRelationshipDataArray')
const {
  resolveRelationshipDataObject,
} = require('./utilities/resolveRelationshipDataObject')

module.exports = function resolveItemRelationship({
  coreToNested,
  getItemByTypeId,
  item,
  path,
  relationshipKey,
  relationships,
  type,
}) {
  const relationship = relationships[relationshipKey]

  if (!(relationship && relationship.data)) {
    return item
  }

  // first get all relationship items, to have all data available
  return getRelationshipItems({
    getItemByTypeId,
    relationshipKey,
    relationships,
    type,
  }).then(relationshipItems => {
    return Promise.all(
      relationshipItems.map(relationshipItem => {
        return coreToNested({
          getItemByTypeId,
          item: relationshipItem,
          type: relationshipItem.type,
        })
      })
    ).then(formattedRelationshipItems => {
      if (path) {
        return resolveByPath({
          formattedRelationshipItems,
          item,
          path,
        })
      }

      if (Array.isArray(relationship.data)) {
        return resolveRelationshipDataArray({
          formattedRelationshipItems,
          item,
          relationship,
          relationshipKey,
        })
      }

      return resolveRelationshipDataObject({
        formattedRelationshipItems,
        item,
        relationship,
        relationshipKey,
      })
    })
  })
}
