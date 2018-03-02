module.exports = function buildIncludeArray({ models, relations }) {
  return Object.keys(relations).map(relationKey => {
    const { resource: relationResource } = relations[relationKey]
    const relationModel = models[relationResource]
    return {
      as: relationKey,
      model: relationModel.Model,
    }
  })
}
