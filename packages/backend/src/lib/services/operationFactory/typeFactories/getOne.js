const buildOperationId = require('common/src/buildOperationId')
const addRelationsToQueryParams = require('./utilities/addRelationsToQueryParams')

module.exports = function getOne({
  basePath,
  errors: errorsInput = {},
  exampleResponses = {},
  includeRelations,
  operationId,
  queryParams: queryParamsInput,
  relations,
  resource,
  resourcePath,
  ...rest
}) {
  const queryParams = addRelationsToQueryParams({
    includeRelations,
    queryParams: queryParamsInput,
    relations,
  })
  const errors = {
    '400': ['REQUEST_ERROR'],
    '404': ['RESOURCE_NOT_FOUND_ERROR'],
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }

  const operationType = 'getOne'

  return {
    ...rest,
    errors,
    includeRelations,
    method: 'get',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
    path: `${basePath}/${resourcePath}/{id}`,
    pathParams: ['id'],
    queryParams,
    relations,
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
      relations,
    },
    summary: `Find ${resource} by id`,
  }
}
