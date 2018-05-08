const createLog = require('../../log')

const log = createLog('common:jsonApiClient', 4)

module.exports = function updateRelationship({
  createWithRelationships,
  openApiClient,
  relationship,
}) {
  const isArray = Array.isArray(relationship.data)
  log.debug(
    `relationship with format ${isArray ? 'array' : 'object'}`,
    relationship
  )
  if (isArray) {
    const relationshipItems = relationship.data
    return relationshipItems
      .map(item => {
        return createWithRelationships({ openApiClient, resource: item }).then(
          ({ id, type }) => {
            return {
              id,
              type,
            }
          }
        )
      })
      .then(updatedRelationships => {
        return {
          data: updatedRelationships,
        }
      })
  }
  return createWithRelationships({
    openApiClient,
    resource: relationship.data,
  }).then(({ id, type }) => {
    return {
      data: {
        id,
        type,
      },
    }
  })
}
