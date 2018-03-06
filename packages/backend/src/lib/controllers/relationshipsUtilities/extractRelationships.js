const buildEmptyRelationship = relation => {
  if (relation.format === 'array') {
    return {
      data: [],
    }
  }
  return {
    data: null,
  }
}

const addEmptyRelationships = ({ relationshipsData = {}, relations }) => {
  return Object.keys(relations).reduce((relationships, relationKey) => {
    const relation = relations[relationKey]
    if (relationshipsData[relationKey]) {
      return {
        ...relationships,
        [relationKey]: relationshipsData[relationKey],
      }
    }
    return {
      ...relationships,
      [relationKey]: buildEmptyRelationship(relation),
    }
  }, {})
}

module.exports = function extractRelationships({ fetchedResource, relations }) {
  const dataValues = fetchedResource.dataValues || fetchedResource
  const relationshipsData = Object.keys(relations).reduce(
    (relationships, relationKey) => {
      const {
        format: relationFormat,
        resource: relationResource,
        storeInDocument,
      } = relations[relationKey]

      if (storeInDocument) {
        return dataValues.document.relationships
      }

      if (fetchedResource[relationKey]) {
        let relationshipData
        if (relationFormat === 'array') {
          relationshipData = fetchedResource[relationKey].map(
            ({ dataValues: resourceDataValues }) => {
              return {
                id: `${resourceDataValues.id}`,
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
    },
    {}
  )
  const res = addEmptyRelationships({ relations, relationshipsData })
  return res
}
