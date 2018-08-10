const objectPath = require('object-path')
const { resolveById } = require('./resolveById')

const resolveRelationshipDataArray = ({
  formattedRelationshipItems,
  item,
  relationship,
  relationshipKey,
}) => {
  const resolvedRelations = relationship.data.map(({ id }) => {
    return resolveById({
      formattedRelationshipItems,
      id,
    })
  })

  objectPath.set(item, relationshipKey, resolvedRelations)

  return item
}

module.exports = { resolveRelationshipDataArray }
