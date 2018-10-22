const backendError404 = require('common/src/error/errorFactories/backendError404')
const createControllerWrapper = require('../utilities/wrapper')
const buildIncludeArray = require('../utilities/relationships/buildIncludeArray')
const fetchJsonExternalRelationships = require('../utilities/relationships/fetchJsonExternalRelationships')
// const buildQueryIncludeArray = require('../utilities/relationships/buildQueryIncludeArray')

module.exports = function getOne(options) {
  const {
    models,
    operation: {
      defaultFields = [],
      filterSpecification,
      includeRelations,
      relations,
      resource,
      selectableFields,
    },
    serviceInteractor,
  } = options

  return createControllerWrapper({
    ...options,
    enableInterceptors: false,
    enablePostHooks: false,
    enablePreHooks: false,
    requiredModelMethods: ['buildWhereFilter', 'getById'],
    responseFormat: 'object',
    responseSuccessStatus: 200,
  })(({ model, request }) => {
    const {
      pathParams: { id },
      queryParams: {
        excludeFields: excludeFieldsInput,
        filter: filterInput,
        includeDeactivated,
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

    return fetchJsonExternalRelationships({
      id,
      queryParamRelationships,
      relations,
      resource,
      serviceInteractor,
    }).then(externalJsonRelationships => {
      return model
        .getById({
          excludeFieldsInput,
          filterInput,
          filterSpecification,
          id,
          include,
          includeDeactivated,
          includeFieldsInput:
            includeFieldsInput && includeFieldsInput.length
              ? includeFieldsInput
              : defaultFields,
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
            externalJsonRelationships,
            item,
          }
        })
    })
  })
}
