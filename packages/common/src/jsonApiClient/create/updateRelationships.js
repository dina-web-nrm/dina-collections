const createLog = require('../../log')
const updateRelationship = require('./updateRelationship')

const log = createLog('common:jsonApiClient', 2)
module.exports = function updateRelationships({
  createWithRelationships,
  openApiClient,
  relationships,
}) {
  log.debug('updateRelationship relationships: ', relationships)
  if (!relationships) {
    return Promise.resolve(relationships)
  }
  const updatedRelationships = { ...relationships }
  const promises = []

  Object.keys(relationships).forEach(relationshipKey => {
    const relationship = relationships[relationshipKey]
    log.debug(
      `updateRelationship relationship with key: ${relationshipKey}: `,
      relationship
    )
    promises.push(
      updateRelationship({
        createWithRelationships,
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
