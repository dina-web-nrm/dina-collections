const buildOperationId = require('./utilities/buildOperationId')

module.exports = function getVersions({
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
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }

  const operationType = 'getVersions'

  return {
    ...rest,
    errors,
    method: 'get',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
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
