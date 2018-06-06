const buildEmptyRelationship = require('./buildEmptyRelationship')
const shouldIncludeRelation = require('../shouldIncludeRelation')

module.exports = function addEmptyRelationships(
  { queryParamRelationships, relations, relationshipsData = {} } = {}
) {
  return Object.keys(relations).reduce((relationships, relationKey) => {
    if (!shouldIncludeRelation({ queryParamRelationships, relationKey })) {
      return relationships
    }

    const relation = relations[relationKey]
    if (relationshipsData[relationKey]) {
      return relationships
    }
    return {
      ...relationships,
      [relationKey]: buildEmptyRelationship(relation),
    }
  }, relationshipsData)
}
