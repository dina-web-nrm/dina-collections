const shouldIncludeRelation = require('../shouldIncludeRelation')

module.exports = function extractRelationship({
  dataValues,
  fetchedResource,
  queryParamRelationships,
  relationKey,
  relation,
}) {
  if (!shouldIncludeRelation({ queryParamRelationships, relationKey })) {
    return null
  }
  const {
    format: relationFormat,
    resource: relationResource,
    storeInDocument,
  } = relation

  if (storeInDocument) {
    return (
      dataValues.document.relationships &&
      dataValues.document.relationships[relationKey]
    )
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
      data: relationshipData,
    }
  }
  return null
}
