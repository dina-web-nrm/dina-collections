const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function getMany({
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
