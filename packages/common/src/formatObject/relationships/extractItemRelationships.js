const extractItemRelationship = require('./extractItemRelationship')

module.exports = function extractItemRelationships({
  item,
  relationshipSpecification,
  toApiFormat,
}) {
  let updatedItem = item
  Object.keys(relationshipSpecification).forEach(relationshipKey => {
    const {
      format: relationshipFormat,
      path,
      type: relationshipType,
    } = relationshipSpecification[relationshipKey]

    updatedItem = extractItemRelationship({
      item,
      path,
      relationshipFormat,
      relationshipKey,
      relationshipType,
      toApiFormat,
    })
  })

  return updatedItem
}
