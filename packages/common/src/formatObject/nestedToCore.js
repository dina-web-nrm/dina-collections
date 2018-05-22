const cloneObject = require('./utilities/cloneObject')
const {
  getNormalizeSpecification,
  getRelationshipSpecification,
} = require('./specifications')

const normalizeItem = require('./normalize/normalizeItem')
const extractItemRelationships = require('./relationships/extractItemRelationships')

module.exports = function nestedToCore({
  extractRelationships = true,
  formatRelationships = true,
  item: rawItem,
  normalize = true,
  type: resourceType,
}) {
  if (typeof rawItem === 'string') {
    throw new Error('item must not be a string')
  }

  if (!rawItem) {
    return rawItem
  }

  let item = cloneObject(rawItem)
  const normalizeSpecification = getNormalizeSpecification(resourceType)
  const relationshipSpecification = getRelationshipSpecification(resourceType)

  if (extractRelationships && relationshipSpecification) {
    item = extractItemRelationships({
      item,
      nestedToCore: formatRelationships ? nestedToCore : null,
      relationshipSpecification,
    })
  }

  if (normalize && normalizeSpecification) {
    item = normalizeItem({ item, normalizeSpecification, resourceType })
  }

  const { id, relationships, ...attributes } = item

  let coreItem = {
    type: resourceType,
  }

  if (id !== undefined) {
    coreItem = {
      ...coreItem,
      id,
    }
  }

  if (relationships && Object.keys(relationships).length) {
    coreItem = {
      ...coreItem,
      relationships,
    }
  }

  if (attributes && Object.keys(attributes).length) {
    coreItem = {
      ...coreItem,
      attributes,
    }
  }

  return coreItem
}
