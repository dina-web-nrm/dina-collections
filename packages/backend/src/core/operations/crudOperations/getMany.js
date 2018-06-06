const addLimitToQueryParams = require('./utilities/addLimitToQueryParams')
const addOffsetToQueryParams = require('./utilities/addOffsetToQueryParams')
const addRelationsToQueryParams = require('./utilities/addRelationsToQueryParams')
const addQueryParamsFromFilter = require('./utilities/addQueryParamsFromFilter')
const buildOperationId = require('common/src/buildOperationId')

module.exports = function getMany({
  basePath,
  errors: errorsInput = {},
  exampleResponses = {},
  includeRelations,
  operationId,
  queryParams: queryParamsInput,
  relations,
  resource,
  filters,
  resourcePath,
  ...rest
}) {
  let queryParams = addRelationsToQueryParams({
    includeRelations,
    queryParams: queryParamsInput,
    relations,
  })

  queryParams = addQueryParamsFromFilter({
    filters,
    queryParams,
  })

  queryParams = addLimitToQueryParams({
    queryParams,
  })

  queryParams = addOffsetToQueryParams({
    queryParams,
  })

  const errors = {
    '400': ['REQUEST_ERROR'],
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }

  const operationType = 'getMany'

  return {
    ...rest,
    errors,
    filters,
    includeRelations,
    method: 'get',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
    path: `${basePath}/${resourcePath}`,
    queryParams,
    relations,
    resource,
    response: {
      examples: exampleResponses,
      format: 'array',
      relations,
    },
    summary: `Find ${resourcePath}`,
  }
}
