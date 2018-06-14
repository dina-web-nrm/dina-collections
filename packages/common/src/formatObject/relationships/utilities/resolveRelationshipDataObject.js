const { resolveById } = require('./resolveById')

const resolveRelationshipDataObject = ({
  formattedRelationshipItems,
  item,
  relationship,
  relationshipKey,
}) => {
  return {
    ...item,
    [relationshipKey]: resolveById({
      formattedRelationshipItems,
      id: relationship.data.id,
    }),
  }
}

module.exports = { resolveRelationshipDataObject }
