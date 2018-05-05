module.exports = function createRelationshipSpecifications(
  { models = {} } = {}
) {
  return Object.keys(models).reduce((specifications, modelKey) => {
    const model = models[modelKey]
    const relationships = model.properties && model.properties.relationships
    if (!relationships) {
      return specifications
    }

    const relationshipSpecification = Object.keys(
      relationships.properties || {}
    ).reduce((modelRelationships, relationshipKey) => {
      const modelRelationship = relationships.properties[relationshipKey]

      if (modelRelationship['x-path']) {
        return {
          ...modelRelationships,
          [relationshipKey]: {
            path: modelRelationship['x-path'],
            type: modelRelationship.properties.data.type,
          },
        }
      }
      return modelRelationships
    }, {})

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
