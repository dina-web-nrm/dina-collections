const cloneObject = require('./utilities/cloneObject')
const {
  getNormalizeSpecification,
  getRelationshipSpecification,
} = require('./specifications')

const denormalizeItem = require('./normalize/denormalizeItem')
const resolveItemRelationships = require('./relationships/resolveItemRelationships')

module.exports = function toObjectFormat({
  denormalize = true,
  getItemByTypeId,
  item: rawItem,
  resolveRelationships = true,
  type,
}) {
  let item = cloneObject(rawItem)
  const { id, relationships, attributes } = item
  console.log('attributes', attributes)
  item = {
    ...attributes,
    id,
  }

  const normalizeSpecification = getNormalizeSpecification(type)
  const relationshipSpecification = getRelationshipSpecification(type)

  if (denormalize && normalizeSpecification) {
    item = denormalizeItem({ item, normalizeSpecification, type })
  }

  if (resolveRelationships && relationshipSpecification) {
    item = resolveItemRelationships({
      getItemByTypeId,
      item,
      relationships,
      relationshipSpecification,
    })
  }

  return item
}
