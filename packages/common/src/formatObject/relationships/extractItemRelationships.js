const extractItemRelationship = require('./extractItemRelationship')

module.exports = function extractItemRelationships({
  item,
  relationshipSpecification,
  toApiFormat,
}) {
  let updatedItem = item
  Object.keys(relationshipSpecification).forEach(relationshipKey => {
    const { path, type } = relationshipSpecification[relationshipKey]

    updatedItem = extractItemRelationship({
      item,
      path,
      relationshipKey,
      toApiFormat,
      type,
    })
  })

  return updatedItem
}
