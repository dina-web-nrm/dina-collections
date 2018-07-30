const extractRelationship = require('./extractRelationship')
const addEmptyRelationships = require('./addEmptyRelationships')

module.exports = function extractRelationships(
  { item, queryParamRelationships, relations = {} } = {}
) {
  const relationshipsData = Object.keys(relations).reduce(
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
  const res = addEmptyRelationships({
    queryParamRelationships,
    relations,
    relationshipsData,
  })
  return res
}
