const backendError404 = require('common/src/error/errorFactories/backendError404')
const createObjectResponse = require('../utilities/transformations/createObjectResponse')
const transformOutput = require('../utilities/transformations/outputObject')
const buildIncludeArray = require('../utilities/relationships/buildIncludeArray')
const extractRelationships = require('../utilities/relationships/extractRelationships')

module.exports = function getOne({ operation, models }) {
  const { includeRelations, relations, resource } = operation

  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }
  return ({ request }) => {
    const {
      pathParams: { id },
      queryParams: { relationships: queryParamRelationships = '' } = {},
    } = request

    let include
    if (relations && includeRelations && queryParamRelationships) {
      include = buildIncludeArray({
        models,
        queryParamRelationships,
        relations,
      })
    }

    return model
      .getById({ id, include, raw: false })
      .then(({ item: fetchedResource } = {}) => {
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
            queryParamRelationships,
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
