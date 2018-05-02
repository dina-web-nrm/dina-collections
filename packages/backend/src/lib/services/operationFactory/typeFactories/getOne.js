const addRelationsToQueryParams = require('./utilities/addRelationsToQueryParams')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

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

  return {
    ...rest,
    errors,
    includeRelations,
    method: 'get',
    operationId: operationId || `get${capitalizeFirstLetter(resource)}`,
    operationType: 'getOne',
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
