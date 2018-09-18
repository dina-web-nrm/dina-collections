const buildOperationId = require('common/src/buildOperationId')
const buildQueryRequest = require('./utilities/buildQueryRequest')

module.exports = function query({
  aggregationSpecification,
  basePath,
  errors: errorsInput = {},
  exampleResponses = {},
  filterSpecification,
  operationId,
  queryParams,
  relations,
  resource,
  resourcePath,
  selectableFields,
  sortableFields,
  ...rest
}) {
  const errors = {
    '400': ['REQUEST_BODY_VALIDATION_ERROR', 'REQUEST_ERROR'],
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }

  const operationType = 'query'

  return {
    ...rest,
    aggregationSpecification,
    errors,
    filterSpecification,
    method: 'post',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
    path: `${basePath}/${resourcePath}/actions/query`,
    queryParams,
    relations,
    request: buildQueryRequest({
      aggregationSpecification,
      filterSpecification,
      selectableFields,
      sortableFields,
    }),
    // request: {
    //   examples: exampleRequests,
    //   format: 'object',
    //   relations,
    //   resource: 'customObject',
    // },
    resource,
    response: {
      examples: exampleResponses,
      format: 'array',
      relations,
      resource: 'customObject',
      status: 200,
    },
    selectableFields,
    sortableFields,
    summary: `Query ${resource}`,
  }
}
