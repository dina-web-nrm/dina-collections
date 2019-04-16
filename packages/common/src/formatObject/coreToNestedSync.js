const cloneObject = require('./utilities/cloneObject')
const {
  getNormalizeSpecification,
  getRelationshipSpecification,
} = require('./specifications')

const denormalizeItem = require('./normalize/denormalizeItem')
const resolveItemRelationships = require('./relationships/resolveItemRelationships')
const resolveItemRelationshipsSync = require('./relationships/resolveItemRelationshipsSync')

module.exports = function coreToNestedSync({
  asyncCoreToNested,
  denormalize = true,
  getItemByTypeId,
  item: rawItem,
  resolveRelationships = true,
  type,
}) {
  if (!rawItem) {
    return rawItem
  }

  let item = cloneObject(rawItem)
  const { id, relationships, attributes } = item
  item = {
    ...attributes,
    id,
  }

  const normalizeSpecification = getNormalizeSpecification(type)

  if (denormalize && normalizeSpecification) {
    item = denormalizeItem({ item, normalizeSpecification, type })
  }

  const relationshipSpecification = getRelationshipSpecification(type)

  if (resolveRelationships && relationshipSpecification) {
    item = asyncCoreToNested
      ? resolveItemRelationships({
          coreToNested: asyncCoreToNested,
          getItemByTypeId,
          item,
          relationships,
          relationshipSpecification,
        })
      : resolveItemRelationshipsSync({
          coreToNestedSync,
          getItemByTypeId,
          item,
          relationships,
          relationshipSpecification,
        })
  }

  return item
}
