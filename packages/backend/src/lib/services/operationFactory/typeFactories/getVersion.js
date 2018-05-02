const capitalizeFirstLetter = require('common/src/stringFormatters/capitalizeFirstLetter')

module.exports = function getVersion({
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
    '404': ['RESOURCE_NOT_FOUND_ERROR'],
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }
  const operationId = `get${capitalizeFirstLetter(resource)}Version`

  return {
    ...rest,
    description:
      'The id of the returned resource is the versionId and not the ordinary id',
    errors,
    method: 'get',
    operationId,
    operationType: 'getVersion',
    path: `${basePath}/${resourcePath}/{id}/versions/{versionId}`,
    pathParams: ['id', 'versionId'],
    queryParams,
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
      relations,
    },
    summary: `Find ${resource} version by id and versionId`,
  }
}
