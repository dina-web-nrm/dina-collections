const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function create({
  basePath,
  exampleRequests = {},
  exampleResponses = {},
  operationId,
  queryParams,
  resource,
  relations,
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
