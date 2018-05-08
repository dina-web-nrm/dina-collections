const updateRelatedRelationshipResources = require('./updateRelatedRelationshipResources')
const createWithoutRelationships = require('./createWithoutRelationships')
const updateResourceRelationships = require('./updateResourceRelationships')

module.exports = function create(
  { openApiClient, resourceType, userOptions } = {}
) {
  const { body = {} } = userOptions
  const item = body.data
  const { id, attributes, relationships, type } = item
  if (resourceType !== type) {
    throw new Error(`Wrong type: ${type} for resourceType: ${resourceType}`)
  }

  return updateRelatedRelationshipResources({
    openApiClient,
    relationships,
  }).then(updatedRelationships => {
    const itemWithoutRelationships = {
      attributes,
      id,
      type,
    }

    return createWithoutRelationships({
      item: itemWithoutRelationships,
      openApiClient,
    }).then(createdResource => {
      return updateResourceRelationships({
        relationships: updatedRelationships,
        resource: createdResource,
      })
    })
  })
}
