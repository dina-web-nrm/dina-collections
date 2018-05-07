const extractItemRelationship = require('./extractItemRelationship')

module.exports = function extractItemRelationships({
  item,
  relationshipSpecification,
  toCoreFormat,
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
      toCoreFormat,
    })
  })

  return updatedItem
}
