const { Dependor } = require('../../Dependor')

const { modifyRelatedResources } = require('./modifyRelatedResources')
const { updateRelationships } = require('./updateRelationships')

const dep = new Dependor({
  create,
  modifyRelatedResources,
  updateRelationships,
})

function recursiveCreate({ openApiClient, resourceType, item } = {}) {
  console.log('recursiveCreate - item', item)
  const { attributes, relationships, type } = item
  if (resourceType !== type) {
    throw new Error(`Wrong type: ${type} for resourceType: ${resourceType}`)
  }

  return dep
    .modifyRelatedResources({
      openApiClient,
      relationships,
    })
    .then(updatedRelationships => {
      console.log(
        'recursiveCreate - updatedRelationships',
        updatedRelationships
      )
      const itemWithoutRelationships = {
        attributes,
        type,
      }

      return dep
        .create({
          item: itemWithoutRelationships,
          openApiClient,
        })
        .then(createdResource => {
          console.log('createdResource', createdResource)
          return dep
            .updateRelationships({
              item: createdResource.data,
              relationships: updatedRelationships,
            })
            .then(() => {
              console.log('returning')
              return createdResource
            })
        })
    })
}

module.exports = {
  dep,
  recursiveCreate,
}
