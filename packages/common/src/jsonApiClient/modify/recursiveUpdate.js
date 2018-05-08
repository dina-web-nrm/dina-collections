const { Dependor } = require('../../Dependor')

const { modifyRelatedResources } = require('./modifyRelatedResources')
const { update } = require('./update')
const { updateRelationships } = require('./updateRelationships')

const dep = new Dependor({
  modifyRelatedResources,
  update,
  updateRelationships,
})

function recursiveUpdate({ openApiClient, resourceType, item } = {}) {
  const { id, attributes, relationships, type } = item
  if (resourceType !== type) {
    throw new Error(`Wrong type: ${type} for resourceType: ${resourceType}`)
  }

  return dep
    .modifyRelatedResources({
      openApiClient,
      relationships,
    })
    .then(updatedRelationships => {
      const itemWithoutRelationships = {
        attributes,
        id,
        type,
      }

      return dep
        .update({
          item: itemWithoutRelationships,
          openApiClient,
        })
        .then(updatedResource => {
          return dep
            .updateRelationships({
              item: updatedResource.data,
              relationships: updatedRelationships,
            })
            .then(() => {
              return updatedResource
            })
        })
    })
}

module.exports = {
  dep,
  recursiveUpdate,
}
