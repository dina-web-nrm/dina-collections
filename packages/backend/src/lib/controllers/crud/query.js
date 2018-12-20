const createControllerWrapper = require('../utilities/wrapper')

module.exports = function queryController(options) {
  const {
    operation: {
      aggregationSpecification,
      filterSpecification,
      selectableFields,
      sortableFields,
    },
    serviceInteractor,
  } = options

  return createControllerWrapper({
    ...options,
    enableInterceptors: false,
    enablePostHooks: false,
    enablePreHooks: false,
    requiredModelMethods: ['buildWhereQuery', 'getWhere'],
    responseFormat: 'array',
    responseSuccessStatus: 200,
  })(({ model, request }) => {
    const {
      body: {
        data: {
          attributes: {
            aggregations,
            excludeFields: excludeFieldsInput,
            filter: filterInput,
            idsInMeta,
            includeDeactivated,
            includeFields: includeFieldsInput,
            limit,
            offset,
            query,
            scroll,
            scrollId,
            sort: sortInput,
          },
        },
      },
    } = request

    return model.getWhere({
      aggregations,
      aggregationSpecification,
      excludeFieldsInput,
      filterInput,
      filterSpecification,
      idsInMeta,
      includeDeactivated,
      includeFieldsInput,
      limit,
      offset,
      query,
      scroll,
      scrollId,
      selectableFields,
      serviceInteractor,
      sortableFields,
      sortInput,
    })
  })
}
