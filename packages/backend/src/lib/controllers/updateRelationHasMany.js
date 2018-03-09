const backendError404 = require('common/src/error/errorFactories/backendError404')
const extractRelationships = require('./relationshipsUtilities/extractRelationships')
const createArrayResponse = require('./transformations/createArrayResponse')

module.exports = function updateRelationHasMany({ operation, models }) {
  const { relation, resource } = operation

  const {
    key: relationKey,
    storeInDocument,
    resource: relationResource,
  } = relation

  const model = models[resource]
  if (!storeInDocument) {
    throw new Error(
      'updateRelationHasMany not implemented for !storeInDocument'
    )
  }

  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }

  const relations = {
    [relationKey]: relation,
  }

  return ({ request }) => {
    const { body: { data: relationshipsInput } } = request
    const { pathParams: { id } } = request

    return model.getById({ id }).then(fetchedResource => {
      if (!fetchedResource) {
        backendError404({
          code: 'RESOURCE_NOT_FOUND_ERROR',
          detail: `Cant find resource: ${resource}, with id: ${id} `,
        })
      }

      const newDocument = {
        ...fetchedResource.document,
        relationships: {
          [relationKey]: { data: relationshipsInput },
        },
      }

      return model
        .update({
          doc: newDocument,
          id,
        })
        .then(updatedResource => {
          const relationships = extractRelationships({
            fetchedResource: updatedResource,
            relations,
          })
          return relationships[relationKey].data || []
        })
        .then(items => {
          return createArrayResponse({
            items,
            type: relationResource,
          })
        })
    })
  }
}
