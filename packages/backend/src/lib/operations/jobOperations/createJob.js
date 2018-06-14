const buildOperationId = require('common/src/buildOperationId')

module.exports = function createJob({
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

  const operationType = 'createJob'

  return {
    ...rest,
    errors,
    method: 'post',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
    path: `${basePath}/${resourcePath}/actions/createJob`,
    queryParams,
    request: {
      examples: exampleRequests,
      format: 'object',
    },
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
      status: 201,
    },
    summary: `Create job`,
  }
}
