const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function update({
  basePath,
  exampleRequests = {},
  exampleResponses = {},
  queryParams,
  resource,
  relations,
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
    relations,
    request: {
      exampleRequests,
      format: 'object',
      relations,
    },
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
      relations,
    },
    summary: `Updates ${resource}`,
  }
}
