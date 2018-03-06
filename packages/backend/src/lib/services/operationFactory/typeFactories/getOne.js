const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function getOne({
  basePath,
  exampleResponses = {},
  operationId,
  queryParams,
  relations,
  resource,
  resourcePlural,
  ...rest
}) {
  return {
    ...rest,
    method: 'get',
    operationId: operationId || `get${capitalizeFirstLetter(resource)}`,
    operationType: 'getOne',
    path: `${basePath}/${resourcePlural}/{id}`,
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
