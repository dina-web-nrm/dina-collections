const extractItemRelationship = require('./extractItemRelationship')

module.exports = function extractItemRelationships({
  item,
  nestedToCoreSync,
  relationshipSpecification,
}) {
  let updatedItem = item
  Object.keys(relationshipSpecification).forEach(relationshipKey => {
    const {
      format: relationshipFormat,
      path,
      targetResource: relationshipType,
    } = relationshipSpecification[relationshipKey]

    updatedItem = extractItemRelationship({
      item,
      nestedToCoreSync,
      path,
      relationshipFormat,
      relationshipKey,
      relationshipType,
    })
  })

  return updatedItem
}
