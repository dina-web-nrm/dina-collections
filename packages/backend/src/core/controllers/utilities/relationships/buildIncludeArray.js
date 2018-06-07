const shouldIncludeRelation = require('./shouldIncludeRelation')

module.exports = function buildIncludeArray(
  { models, queryParamRelationships, relations = [] } = {}
) {
  if (!(models && typeof models === 'object')) {
    throw new Error('Provide model object')
  }

  Object.keys(models).forEach(modelKey => {
    if (!models[modelKey].Model) {
      throw new Error(
        `Model with key: ${modelKey} dont have sequalize Model instance`
      )
    }
  })

  return Object.keys(relations)
    .map(relationKey => {
      const { targetResource: relationResource, storeInDocument } = relations[
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
