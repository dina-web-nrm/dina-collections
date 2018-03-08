const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function getVersions({
  basePath,
  exampleResponses = {},
  queryParams,
  relations,
  resource,
  resourcePlural,
  ...rest
}) {
  const operationId = `get${capitalizeFirstLetter(resource)}Versions`
  return {
    ...rest,
    method: 'get',
    operationId,
    operationType: 'getVersions',
    path: `${basePath}/${resourcePlural}/{id}/versions`,
    pathParams: ['id'],
    queryParams,
    resource,
    response: {
      examples: exampleResponses,
      format: 'array',
      relations,
    },
    summary: `Find ${resourcePlural} versions`,
  }
}
