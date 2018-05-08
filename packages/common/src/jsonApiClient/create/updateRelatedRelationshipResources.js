const updateRelatedRelationshipResource = require('./updateRelatedRelationshipResource')

module.exports = function updateRelatedRelationshipResources({
  openApiClient,
  relationships,
}) {
  if (!relationships) {
    return Promise.resolve(relationships)
  }
  const updatedRelationships = { ...relationships }
  const promises = []

  Object.keys(relationships).forEach(relationshipKey => {
    const relationship = relationships[relationshipKey]
    promises.push(
      updateRelatedRelationshipResource({
        openApiClient,
        relationship,
      }).then(updatedRelationship => {
        updatedRelationships[relationshipKey] = updatedRelationship
      })
    )
  })

  return Promise.all(promises).then(() => {
    return updatedRelationships
  })
}
