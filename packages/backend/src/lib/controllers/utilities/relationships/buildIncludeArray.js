const shouldIncludeRelation = require('./shouldIncludeRelation')

module.exports = function buildIncludeArray(
  { models, queryParamRelationships, relations = [] } = {}
) {
  if (!(models && typeof models === 'object')) {
    throw new Error('Provide model object')
  }

  return Object.keys(relations)
    .map(relationKey => {
      const {
        targetResource: relationResource,
        storeInDocument,
        keyType,
      } = relations[relationKey]
      if (storeInDocument) {
        return null
      }

      if (!storeInDocument && keyType === 'json') {
        return null
      }

      if (!shouldIncludeRelation({ queryParamRelationships, relationKey })) {
        return null
      }

      if (!models[relationResource].Model) {
        throw new Error(
          `Model with key: ${
            relationResource
          } dont have sequalize Model instance`
        )
      }

      const relationModel = models[relationResource]
      return {
        as: relationKey,
        model: relationModel.Model,
        paranoid: false,
      }
    })
    .filter(includeElement => {
      return !!includeElement
    })
}
