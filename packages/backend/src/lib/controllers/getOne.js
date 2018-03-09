const backendError404 = require('common/src/error/errorFactories/backendError404')
const createObjectResponse = require('./transformations/createObjectResponse')
const transformOutput = require('./transformations/outputObject')
const buildIncludeArray = require('./relationshipsUtilities/buildIncludeArray')
const extractRelationships = require('./relationshipsUtilities/extractRelationships')

module.exports = function getOne({ operation, models }) {
  const { includeRelations, relations, resource } = operation

  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  return ({ request }) => {
    let include
    if (relations && includeRelations) {
      include = buildIncludeArray({ models, relations })
    }

    const { pathParams: { id } } = request
    return model.getById({ id, include, raw: false }).then(fetchedResource => {
      if (!fetchedResource) {
        backendError404({
          code: 'RESOURCE_NOT_FOUND_ERROR',
          detail: `${resource} with id: ${id} not found`,
        })
      }
      const relationships =
        includeRelations &&
        extractRelationships({
          fetchedResource,
          relations,
        })

      const output = transformOutput(fetchedResource)
      return createObjectResponse({
        data: output,
        id: output.id,
        relationships,
        type: resource,
      })
    })
  }
}
