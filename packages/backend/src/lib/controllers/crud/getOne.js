const backendError404 = require('common/src/error/errorFactories/backendError404')
const createControllerWrapper = require('../utilities/wrapper')
const buildIncludeArray = require('../utilities/relationships/buildIncludeArray')

module.exports = function getOne(options) {
  const {
    models,
    operation: { includeRelations, relations, resource, selectableFields },
  } = options

  return createControllerWrapper({
    ...options,
    enableInterceptors: false,
    enablePostHooks: false,
    enablePreHooks: false,

    requiredModelMethods: ['getById'],
    responseFormat: 'object',
    responseSuccessStatus: 200,
  })(({ model, request }) => {
    const {
      pathParams: { id },
      queryParams: {
        excludeFields: excludeFieldsInput,
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
        excludeFieldsInput,
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
        return {
          item,
        }
      })
  })
}
