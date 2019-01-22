const objectPath = require('object-path')

const setExtractedRelationshipData = ({
  item,
  relationshipArray = [],
  relationshipFormat,
  relationshipKey,
  relationshipObject,
}) => {
  if (relationshipFormat === 'object' && relationshipObject !== undefined) {
    objectPath.set(
      item,
      `relationships.${relationshipKey}.data`,
      relationshipObject
    )
  }

  if (relationshipFormat === 'array') {
    objectPath.set(
      item,
      `relationships.${relationshipKey}.data`,
      relationshipArray
    )
  }

  return item
}

module.exports = { setExtractedRelationshipData }
