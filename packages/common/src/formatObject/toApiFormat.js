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
  type,
}) {
  let item = cloneObject(rawItem)
  const normalizeSpecification = getNormalizeSpecification(type)
  const relationshipSpecification = getRelationshipSpecification(type)

  if (extractRelationships && relationshipSpecification) {
    item = extractItemRelationships({
      item,
      relationshipSpecification,
      toApiFormat: formatRelationships ? toApiFormat : null,
    })
  }

  if (normalize && normalizeSpecification) {
    item = normalizeItem({ item, normalizeSpecification, type })
  }

  const { id, relationships, ...attributes } = item

  return {
    attributes,
    id,
    relationships,
    type,
  }
}
