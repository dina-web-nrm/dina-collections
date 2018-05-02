const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function getVersions({
  basePath,
  errors: errorsInput = {},
  exampleResponses = {},
  queryParams,
  relations,
  resource,
  resourcePath,
  ...rest
}) {
  const errors = {
    '400': ['REQUEST_ERROR'],
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }
  const operationId = `get${capitalizeFirstLetter(resource)}Versions`
  return {
    ...rest,
    errors,
    method: 'get',
    operationId,
    operationType: 'getVersions',
    path: `${basePath}/${resourcePath}/{id}/versions`,
    pathParams: ['id'],
    queryParams,
    resource,
    response: {
      examples: exampleResponses,
      format: 'array',
      relations,
    },
    summary: `Find ${resourcePath} versions`,
  }
}
