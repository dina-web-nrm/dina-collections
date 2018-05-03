const buildOperationId = require('./utilities/buildOperationId')

module.exports = function getVersion({
  basePath,
  errors: errorsInput = {},
  exampleResponses = {},
  operationId,
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

  const operationType = 'getVersion'

  return {
    ...rest,
    description:
      'The id of the returned resource is the versionId and not the ordinary id',
    errors,
    method: 'get',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
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
