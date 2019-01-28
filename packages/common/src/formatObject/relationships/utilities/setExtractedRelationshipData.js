const objectPath = require('object-path')

const setExtractedRelationshipData = ({
  item,
  relationshipArray = [],
  relationshipFormat,
  relationshipKey,
  relationshipObject,
  stripRelationships,
}) => {
  if (relationshipFormat === 'object' && relationshipObject !== undefined) {
    objectPath.set(
      item,
      `relationships.${relationshipKey}.data`,
      stripRelationships
        ? { id: relationshipObject.id, type: relationshipObject.type }
        : relationshipObject
    )
  }

  if (relationshipFormat === 'array') {
    objectPath.set(
      item,
      `relationships.${relationshipKey}.data`,
      stripRelationships
        ? relationshipArray.map(({ id, type }) => {
            return {
              id,
              type,
            }
          })
        : relationshipArray
    )
  }

  return item
}

module.exports = { setExtractedRelationshipData }
