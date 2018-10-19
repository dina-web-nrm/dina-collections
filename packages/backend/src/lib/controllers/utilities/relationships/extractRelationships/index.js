const extractRelationship = require('./extractRelationship')
const addEmptyRelationships = require('./addEmptyRelationships')

module.exports = function extractRelationships(
  {
    externalJsonRelationships,
    item,
    queryParamRelationships,
    relations = {},
  } = {}
) {
  let relationshipsData = Object.keys(relations).reduce(
    (relationships, relationKey) => {
      const relation = relations[relationKey]
      const relationshipData = extractRelationship({
        item,
        queryParamRelationships,
        relation,
        relationKey,
      })
      if (relationshipData) {
        return {
          ...relationships,
          [relationKey]: relationshipData,
        }
      }
      return relationships
    },
    {}
  )

  if (
    externalJsonRelationships &&
    Object.keys(externalJsonRelationships).length
  ) {
    relationshipsData = {
      ...relationshipsData,
      ...externalJsonRelationships,
    }
  }

  const res = addEmptyRelationships({
    queryParamRelationships,
    relations,
    relationshipsData,
  })
  return res
}
