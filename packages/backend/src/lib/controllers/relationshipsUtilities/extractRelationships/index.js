const extractRelationship = require('./extractRelationship')
const addEmptyRelationships = require('./addEmptyRelationships')

module.exports = function extractRelationships(
  { fetchedResource, queryParamRelationships, relations = {} } = {}
) {
  const dataValues = fetchedResource
  const relationshipsData = Object.keys(relations).reduce(
    (relationships, relationKey) => {
      const relation = relations[relationKey]
      const relationshipData = extractRelationship({
        dataValues,
        fetchedResource,
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
