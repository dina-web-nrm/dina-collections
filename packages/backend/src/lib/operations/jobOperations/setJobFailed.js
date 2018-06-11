const buildOperationId = require('common/src/buildOperationId')

module.exports = function setJobFailed({
  basePath,
  errors: errorsInput = {},
  exampleRequests = {},
  exampleResponses = {},
  operationId,
  queryParams,
  resource,
  resourcePath,
  ...rest
}) {
  const errors = {
    '400': ['REQUEST_BODY_VALIDATION_ERROR', 'REQUEST_ERROR'],
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }

  const operationType = 'setJobFailed'

  return {
    ...rest,
    errors,
    method: 'post',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
    path: `${basePath}/${resourcePath}/actions/{id}/setJobFailed`,
    pathParams: ['id'],
    queryParams,
    request: {
      examples: exampleRequests,
      format: 'object',
      resource: 'customObject',
    },
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
      status: 201,
    },
    summary: `Set job failed`,
  }
}
