const buildOperationId = require('common/src/buildOperationId')

module.exports = function bulkCreate({
  basePath,
  errors: errorsInput = {},
  exampleRequests = {},
  exampleResponses = {},
  operationId,
  queryParams,
  relations,
  resource,
  resourcePath,
  ...rest
}) {
  const errors = {
    '400': ['REQUEST_BODY_VALIDATION_ERROR', 'REQUEST_ERROR'],
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }

  const operationType = 'bulkCreate'

  return {
    ...rest,
    errors,
    method: 'post',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
    path: `${basePath}/${resourcePath}/actions/bulkCreate`,
    queryParams,
    relations,
    request: {
      examples: exampleRequests,
      format: 'array',
      relations,
    },
    resource,
    response: {
      examples: exampleResponses,
      format: 'array',
      relations,
      status: 201,
    },
    summary: `Bulk create multiple ${resource}`,
  }
}
