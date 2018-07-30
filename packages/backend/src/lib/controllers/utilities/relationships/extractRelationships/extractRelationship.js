const shouldIncludeRelation = require('../shouldIncludeRelation')

module.exports = function extractRelationship({
  item,
  queryParamRelationships,
  relationKey,
  relation,
}) {
  if (!shouldIncludeRelation({ queryParamRelationships, relationKey })) {
    return null
  }
  const {
    format: relationFormat,
    targetResource: relationResource,
    storeInDocument,
  } = relation

  if (storeInDocument) {
    return item.relationships && item.relationships[relationKey]
  }

  const { internals = {} } = item

  if (internals[relationKey]) {
    let relationshipData
    if (relationFormat === 'array') {
      relationshipData = internals[relationKey].map(
        ({ dataValues: resourceDataValues }) => {
          return {
            id: `${resourceDataValues.id}`,
            type: relationResource,
          }
        }
      )
    } else {
      relationshipData = {
        id: `${internals[relationKey].dataValues.id}`,
        type: relationResource,
      }
    }

    return {
      data: relationshipData,
    }
  }
  return null
}
