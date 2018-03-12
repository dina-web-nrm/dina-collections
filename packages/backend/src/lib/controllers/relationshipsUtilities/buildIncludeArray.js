const shouldIncludeRelation = require('./shouldIncludeRelation')

module.exports = function buildIncludeArray({
  models,
  queryParamRelationships,
  relations,
}) {
  return Object.keys(relations)
    .map(relationKey => {
      const { resource: relationResource, storeInDocument } = relations[
        relationKey
      ]
      if (storeInDocument) {
        return null
      }

      if (!shouldIncludeRelation({ queryParamRelationships, relationKey })) {
        return null
      }

      const relationModel = models[relationResource]
      return {
        as: relationKey,
        model: relationModel.Model,
      }
    })
    .filter(includeElement => {
      return !!includeElement
    })
}
