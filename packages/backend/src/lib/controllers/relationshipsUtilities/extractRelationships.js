module.exports = function extractRelationships({ fetchedResource, relations }) {
  return Object.keys(relations).reduce((relationships, relationKey) => {
    const { format: relationFormat, resource: relationResource } = relations[
      relationKey
    ]
    if (fetchedResource[relationKey]) {
      let relationshipData
      if (relationFormat === 'array') {
        relationshipData = fetchedResource[relationKey].map(
          ({ dataValues }) => {
            return {
              id: `${dataValues.id}`,
              type: relationResource,
            }
          }
        )
      } else {
        relationshipData = {
          id: `${fetchedResource[relationKey].dataValues.id}`,
          type: relationResource,
        }
      }

      return {
        ...relationships,
        [relationKey]: {
          data: relationshipData,
        },
      }
    }
    return relationships
  }, {})
}
