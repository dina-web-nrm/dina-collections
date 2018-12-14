const objectPath = require('object-path')
const shouldIncludeRelation = require('../shouldIncludeRelation')

module.exports = function extractRelationship({
  externalRelationships,
  item,
  queryParamRelationships,
  relation,
  relationKey,
}) {
  if (!shouldIncludeRelation({ queryParamRelationships, relationKey })) {
    return null
  }
  const {
    format: relationFormat,
    targetResource: relationResource,
    storeInDocument,
    storeInExternalDocument,
  } = relation

  if (storeInDocument) {
    return objectPath.get(item, `relationships.${relationKey}`)
  }

  if (storeInExternalDocument) {
    return objectPath.get(externalRelationships, relationKey)
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
