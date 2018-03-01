const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function create({
  basePath,
  exampleRequests = {},
  exampleResponses = {},
  queryParams,
  resource,
  resourcePlural,
}) {
  const operationId = `create${capitalizeFirstLetter(resource)}`
  return {
    method: 'post',
    operationId,
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
    },
    summary: `Create ${resource}`,
  }
}
