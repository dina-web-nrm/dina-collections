const createControllerWrapper = require('../utilities/wrapper')
const buildIncludeArray = require('../utilities/relationships/buildIncludeArray')

module.exports = function getMany(options) {
  const {
    models,
    operation: {
      filterSpecification,
      includeRelations,
      relations,
      selectableFields,
      sortableFields,
    },
    serviceInteractor,
  } = options

  return createControllerWrapper({
    ...options,
    enableInterceptors: true,
    enablePostHooks: false,
    enablePreHooks: false,
    requiredModelMethods: ['buildWhereFilter', 'getById', 'getWhere'],
    responseFormat: 'array',
    responseSuccessStatus: 200,
  })(({ model, request }) => {
    const {
      queryParams: {
        excludeFields: excludeFieldsInput,
        filter: filterInput,
        includeDeactivated,
        includeFields: includeFieldsInput,
        limit = 10,
        offset = 0,
        relationships: queryParamRelationships = '',
        sort: sortInput,
      } = {},
    } = request

    let include
    if (relations && includeRelations) {
      include = buildIncludeArray({
        models,
        queryParamRelationships,
        relations,
      })
    }

    return model
      .getWhere({
        excludeFieldsInput,
        filterInput,
        filterSpecification,
        include,
        includeDeactivated,
        includeFieldsInput,
        limit,
        offset,
        selectableFields,
        serviceInteractor,
        sortableFields,
        sortInput,
      })
      .then(({ items, meta } = {}) => {
        return {
          items,
          meta,
          request,
        }
      })
  })
}
