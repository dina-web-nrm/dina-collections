const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function create({
  basePath,
  exampleRequests = {},
  exampleResponses = {},
  modelName,
  queryParams,
  resource,
  resourcePlural,
}) {
  const operationId = `create${capitalizeFirstLetter(resource)}`
  return {
    method: 'post',
    modelName,
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
