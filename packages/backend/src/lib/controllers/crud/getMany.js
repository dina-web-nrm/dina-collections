const createControllerWrapper = require('../utilities/wrapper')
const buildIncludeArray = require('../utilities/relationships/buildIncludeArray')
const fetchExternalRelationships = require('../utilities/relationships/fetchExternalRelationships')

module.exports = function getMany(options) {
  const {
    models,
    operation: {
      defaultFields = [],
      filterSpecification,
      includeRelations,
      relations,
      resource,
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
  })(({ count, model, request }) => {
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
        count,
        excludeFieldsInput,
        filterInput,
        filterSpecification,
        include,
        includeDeactivated,
        includeFieldsInput:
          includeFieldsInput && includeFieldsInput.length
            ? includeFieldsInput
            : defaultFields,
        limit,
        offset,
        selectableFields,
        serviceInteractor,
        sortableFields,
        sortInput,
      })
      .then(({ items, meta } = {}) => {
        return fetchExternalRelationships({
          filterSpecification,
          items,
          queryParamRelationships,
          relations,
          resource,
          serviceInteractor,
        }).then(itemsExternalRelationships => {
          return {
            items,
            itemsExternalRelationships,
            meta,
            request,
          }
        })
      })
  })
}
