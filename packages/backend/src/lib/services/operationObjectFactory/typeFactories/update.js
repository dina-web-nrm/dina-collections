const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function update({
  basePath,
  exampleRequests = {},
  exampleResponses = {},
  queryParams,
  resource,
  resourcePlural,
  ...rest
}) {
  const operationId = `update${capitalizeFirstLetter(resource)}`
  return {
    ...rest,
    method: 'patch',
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
