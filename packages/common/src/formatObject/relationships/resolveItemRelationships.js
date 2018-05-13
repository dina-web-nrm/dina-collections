const resolveItemRelationship = require('./resolveItemRelationship')

module.exports = function resolveItemRelationships({
  coreToNested,
  getItemByTypeId,
  item,
  relationships = {},
  relationshipSpecification,
}) {
  let updatedItem = item
  Object.keys(relationshipSpecification).forEach(relationshipKey => {
    const { path, type } = relationshipSpecification[relationshipKey]

    updatedItem = resolveItemRelationship({
      coreToNested,
      getItemByTypeId,
      item: updatedItem,
      path,
      relationshipKey,
      relationships,
      type,
    })
  })
  return updatedItem
}
