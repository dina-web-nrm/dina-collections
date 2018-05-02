const { Dependor } = require('../../Dependor')
const buildOperationId = require('../../buildOperationId')
const updateRelationships = require('./updateRelationships')

const dep = new Dependor({
  buildOperationId,
  updateRelationships,
})

function createWithRelationships({ openApiClient, resource }) {
  const { relationships, type } = resource
  return dep
    .updateRelationships({
      createWithRelationships,
      relationships,
    })
    .then(updatedRelationships => {
      const updatedResource = {
        ...resource,
        relationships: updatedRelationships,
      }
      if (resource.id) {
        return openApiClient.call(
          dep.buildOperationId({
            operationType: 'update',
            resource: type,
          }),
          {
            body: updatedResource,
            pathParams: {
              id: updatedResource.id,
            },
          }
        )
      }

      return openApiClient.call(
        dep.buildOperationId({
          operationType: 'create',
          resource: type,
        }),
        {
          body: updatedResource,
        }
      )
    })
}

module.exports = {
  createWithRelationships,
  dep,
}
