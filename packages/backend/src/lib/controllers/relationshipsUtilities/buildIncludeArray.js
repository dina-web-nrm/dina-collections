module.exports = function buildIncludeArray({ models, relations }) {
  return Object.keys(relations)
    .map(relationKey => {
      const { resource: relationResource, storeInDocument } = relations[
        relationKey
      ]
      if (storeInDocument) {
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
