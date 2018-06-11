const {
  getRelationshipItemsSync,
} = require('./utilities/getRelationshipItemsSync')
const { resolveByPath } = require('./utilities/resolveByPath')
const {
  resolveRelationshipDataArray,
} = require('./utilities/resolveRelationshipDataArray')
const {
  resolveRelationshipDataObject,
} = require('./utilities/resolveRelationshipDataObject')

module.exports = function resolveItemRelationshipSync({
  coreToNestedSync,
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

  const relationshipItems = getRelationshipItemsSync({
    getItemByTypeId,
    relationshipKey,
    relationships,
    type,
  })

  const formattedRelationshipItems = relationshipItems.map(relationshipItem => {
    return coreToNestedSync({
      getItemByTypeId,
      item: relationshipItem,
      type: relationshipItem.type,
    })
  })

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
}
