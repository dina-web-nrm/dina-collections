const capitalizeFirstLetter = require('common/src/stringFormatters/capitalizeFirstLetter')

module.exports = function create({
  basePath,
  errors: errorsInput = {},
  exampleRequests = {},
  exampleResponses = {},
  operationId,
  queryParams,
  relations,
  resource,
  resourcePath,
  ...rest
}) {
  const errors = {
    '400': ['REQUEST_BODY_VALIDATION_ERROR', 'REQUEST_ERROR'],
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }

  return {
    ...rest,
    errors,
    method: 'post',
    operationId: operationId || `create${capitalizeFirstLetter(resource)}`,
    operationType: 'create',
    path: `${basePath}/${resourcePath}`,
    queryParams,
    relations,
    request: {
      examples: exampleRequests,
      format: 'object',
      relations,
    },
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
      relations,
      status: 201,
    },
    summary: `Create ${resource}`,
  }
}
