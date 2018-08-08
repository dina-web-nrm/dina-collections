const backendError404 = require('common/src/error/errorFactories/backendError404')
const createObjectResponse = require('../utilities/transformations/createObjectResponse')
const buildIncludeArray = require('../utilities/relationships/buildIncludeArray')
const extractRelationships = require('../utilities/relationships/extractRelationships')

module.exports = function getOne({ operation, models }) {
  const { includeRelations, relations, resource, selectableFields } = operation

  const model = models[resource]
  if (!model) {
    throw new Error(`Model not provided for ${resource}`)
  }

  if (!model.getById) {
    throw new Error(`Model missing required method: getById for ${resource}`)
  }

  return ({ request }) => {
    const {
      pathParams: { id },
      queryParams: {
        includeFields: includeFieldsInput,
        relationships: queryParamRelationships = '',
      } = {},
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
      .getById({
        id,
        include,
        includeFieldsInput,
        selectableFields,
      })
      .then(({ item } = {}) => {
        if (!item) {
          backendError404({
            code: 'RESOURCE_NOT_FOUND_ERROR',
            detail: `${resource} with id: ${id} not found`,
          })
        }
        const relationships =
          includeRelations &&
          extractRelationships({
            item,
            queryParamRelationships,
            relations,
          })

        return createObjectResponse({
          data: item,
          id: item.id,
          relationships,
          type: resource,
        })
      })
  }
}
