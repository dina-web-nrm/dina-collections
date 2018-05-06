const cloneObject = require('./utilities/cloneObject')
const {
  getNormalizeSpecification,
  getRelationshipSpecification,
} = require('./specifications')

const normalizeItem = require('./normalize/normalizeItem')
const extractItemRelationships = require('./relationships/extractItemRelationships')

module.exports = function toApiFormat({
  extractRelationships = true,
  formatRelationships = true,
  item: rawItem,
  normalize = true,
  type: resourceType,
}) {
  let item = cloneObject(rawItem)
  const normalizeSpecification = getNormalizeSpecification(resourceType)
  const relationshipSpecification = getRelationshipSpecification(resourceType)

  if (extractRelationships && relationshipSpecification) {
    item = extractItemRelationships({
      item,
      relationshipSpecification,
      toApiFormat: formatRelationships ? toApiFormat : null,
    })
  }

  if (normalize && normalizeSpecification) {
    item = normalizeItem({ item, normalizeSpecification, resourceType })
  }

  const { id, relationships, ...attributes } = item

  return {
    attributes,
    id,
    relationships,
    type: resourceType,
  }
}
