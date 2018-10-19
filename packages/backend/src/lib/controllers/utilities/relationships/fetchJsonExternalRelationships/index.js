const shouldIncludeRelation = require('../shouldIncludeRelation')

module.exports = function fetchJsonExternalRelationships({
  id: srcId,
  relations,
  resource,
  serviceInteractor,
  queryParamRelationships,
}) {
  const remoteRelations = Object.keys(relations)
    .map(relationKey => {
      const { storeInDocument, keyType } = relations[relationKey]

      if (!shouldIncludeRelation({ queryParamRelationships, relationKey })) {
        return null
      }

      if (!storeInDocument && keyType === 'json') {
        return relations[relationKey]
      }
      return null
    })
    .filter(includeElement => {
      return !!includeElement
    })

  const promises = remoteRelations.map(relation => {
    const { targetResource, targetAs } = relation
    const request = {
      queryParams: {
        filter: {
          relationshipId: srcId,
          relationshipType: resource,
        },
        includeFields: ['id'],
      },
    }
    return serviceInteractor
      .getMany({
        request,
        resource: targetResource,
      })
      .then(({ data: items }) => {
        return {
          data: items.map(item => {
            return {
              id: item.id,
              type: targetResource,
            }
          }),
          targetAs,
        }
      })
  })

  return Promise.all(promises).then(resultArray => {
    const relationships = {}
    resultArray.forEach(({ targetAs, data }) => {
      relationships[targetAs] = {
        data,
      }
    })
    return relationships
  })
}
