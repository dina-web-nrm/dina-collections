const objectPath = require('object-path')
const { resolveById } = require('./resolveById')

const resolveRelationshipDataObject = ({
  formattedRelationshipItems,
  item,
  relationship,
  relationshipKey,
}) => {
  const resolvedRelation = resolveById({
    formattedRelationshipItems,
    id: relationship.data.id,
  })

  objectPath.set(item, relationshipKey, resolvedRelation)

  return item
}

module.exports = { resolveRelationshipDataObject }
