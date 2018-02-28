const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function update({
  basePath,
  exampleRequests = {},
  exampleResponses = {},
  modelName,
  queryParams,
  resource,
  resourcePlural,
}) {
  const operationId = `update${capitalizeFirstLetter(resource)}`
  return {
    method: 'patch',
    modelName,
    operationId,
    operationType: 'update',
    path: `${basePath}/${resourcePlural}/{id}`,
    pathParams: ['id'],
    queryParams,
    request: {
      exampleRequests,
      format: 'object',
    },
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
    },
    summary: `Updates ${resource}`,
  }
}
