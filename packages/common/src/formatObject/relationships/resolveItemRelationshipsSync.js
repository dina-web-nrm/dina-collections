const resolveItemRelationshipSync = require('./resolveItemRelationshipSync')

module.exports = function resolveItemRelationshipSyncs({
  coreToNestedSync,
  getItemByTypeId,
  item,
  relationships = {},
  relationshipSpecification,
}) {
  Object.keys(relationshipSpecification).forEach(relationshipKey => {
    const { path, targetResource: type } = relationshipSpecification[
      relationshipKey
    ]

    // prettier-ignore
    item = resolveItemRelationshipSync({ // eslint-disable-line no-param-reassign
      coreToNestedSync,
      getItemByTypeId,
      item,
      path,
      relationshipKey,
      relationships,
      type,
    })
  })

  return item
}
