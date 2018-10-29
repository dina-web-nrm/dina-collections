const { extractByPath } = require('./utilities/extractByPath')
const {
  extractArrayRelationship,
} = require('./utilities/extractArrayRelationship')
const {
  extractObjectRelationship,
} = require('./utilities/extractObjectRelationship')
const {
  setExtractedRelationshipData,
} = require('./utilities/setExtractedRelationshipData')

module.exports = function extractItemRelationship({
  item,
  path,
  relationshipFormat,
  relationshipKey,
  relationshipType,
  nestedToCoreSync,
}) {
  let relationshipObject
  let relationshipArray

  if (path) {
    const extractedRelationships = extractByPath({
      item,
      nestedToCoreSync,
      path,
      relationshipFormat,
      relationshipType,
    })

    relationshipObject = extractedRelationships.relationshipObject // eslint-disable-line prefer-destructuring
    relationshipArray = extractedRelationships.relationshipArray // eslint-disable-line prefer-destructuring
  } else {
    if (relationshipFormat === 'object') {
      relationshipObject = extractObjectRelationship({
        item,
        nestedToCoreSync,
        relationshipKey,
        relationshipType,
      })
    } else {
      relationshipArray = extractArrayRelationship({
        item,
        nestedToCoreSync,
        relationshipKey,
        relationshipType,
      })
    }

    delete item[relationshipKey] // eslint-disable-line
  }

  return setExtractedRelationshipData({
    item,
    relationshipArray,
    relationshipFormat,
    relationshipKey,
    relationshipObject,
  })
}
