const createRelationshipSpecification = require('./createRelationshipSpecification')

module.exports = function createRelationshipSpecifications(
  { models = {} } = {}
) {
  return Object.keys(models).reduce((specifications, modelKey) => {
    const model = models[modelKey]
    const relationships = model.properties && model.properties.relationships
    if (!relationships) {
      return specifications
    }

    const relationshipSpecification = createRelationshipSpecification({
      relationships,
    })

    if (
      relationshipSpecification &&
      Object.keys(relationshipSpecification).length
    ) {
      return {
        ...specifications,
        [modelKey]: relationshipSpecification,
      }
    }

    return specifications
  }, {})
}
