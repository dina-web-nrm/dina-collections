const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function getMany({
  basePath,
  errors: errorsInput = {},
  exampleResponses = {},
  operationId,
  queryParams,
  relations,
  resource,
  resourcePlural,
  ...rest
}) {
  const errors = {
    '400': ['REQUEST_ERROR'],
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }
  return {
    ...rest,
    errors,
    method: 'get',
    operationId: operationId || `get${capitalizeFirstLetter(resourcePlural)}`,
    operationType: 'getMany',
    path: `${basePath}/${resourcePlural}`,
    queryParams,
    relations,
    resource,
    response: {
      examples: exampleResponses,
      format: 'array',
      relations,
    },
    summary: `Find ${resourcePlural}`,
  }
}
