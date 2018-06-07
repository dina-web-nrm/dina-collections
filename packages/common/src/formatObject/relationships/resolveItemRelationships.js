const resolveItemRelationship = require('./resolveItemRelationship')

module.exports = function resolveItemRelationships({
  coreToNestedSync,
  getItemByTypeId,
  item,
  relationships = {},
  relationshipSpecification,
}) {
  let updatedItem = item
  Object.keys(relationshipSpecification).forEach(relationshipKey => {
    const { path, targetResource: type } = relationshipSpecification[
      relationshipKey
    ]

    updatedItem = resolveItemRelationship({
      coreToNestedSync,
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
