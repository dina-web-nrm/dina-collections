const { resolveById } = require('./resolveById')

const resolveRelationshipDataArray = ({
  formattedRelationshipItems,
  item,
  relationship,
  relationshipKey,
}) => {
  return {
    ...item,
    [relationshipKey]: relationship.data.map(({ id }) => {
      return resolveById({
        formattedRelationshipItems,
        id,
      })
    }),
  }
}

module.exports = { resolveRelationshipDataArray }
