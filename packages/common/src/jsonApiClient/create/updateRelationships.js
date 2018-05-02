const updateRelationship = require('./updateRelationship')

module.exports = function updateRelationships({
  createWithRelationships,
  relationships,
}) {
  if (!relationships) {
    return Promise.resolve(relationships)
  }
  const updatedRelationships = { ...relationships }
  const promises = []
  if (relationships) {
    Object.keys(relationships).forEach(relationshipKey => {
      const relationship = relationships[relationshipKey]
      promises.push(
        updateRelationship({ createWithRelationships, relationship }).then(
          updatedRelationship => {
            updatedRelationships[relationshipKey] = updatedRelationship
          }
        )
      )
    })
  }
  return Promise.all(promises).then(() => {
    return updatedRelationships
  })
}
