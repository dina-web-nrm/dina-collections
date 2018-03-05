const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function create({
  basePath,
  exampleRequests = {},
  exampleResponses = {},
  operationId,
  queryParams,
  resource,
  resourcePlural,
  ...rest
}) {
  return {
    ...rest,
    method: 'post',
    operationId: operationId || `create${capitalizeFirstLetter(resource)}`,
    operationType: 'create',
    path: `${basePath}/${resourcePlural}`,
    queryParams,
    request: {
      examples: exampleRequests,
      format: 'object',
    },
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
      status: 201,
    },
    summary: `Create ${resource}`,
  }
}
