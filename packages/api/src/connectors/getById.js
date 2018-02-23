const createObjectResponse = require('../lib/api/utilities/createObjectResponse')
const transformOutput = require('./transformations/outputObject')
const buildIncludeArray = require('./relationshipsUtilities/buildIncludeArray')
const extractRelationships = require('./relationshipsUtilities/extractRelationships')

module.exports = function getById({ connectorOptions, models }) {
  const { includeRelations, modelName, relations, resource } = connectorOptions

  const model = models[modelName]
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
        const error = new Error(`${modelName} with id: ${id} not found`)
        error.status = 404
        throw error
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
