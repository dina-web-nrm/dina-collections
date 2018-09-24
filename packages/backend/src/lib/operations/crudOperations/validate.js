const buildOperationId = require('common/src/buildOperationId')

module.exports = function validate({
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

  let updatedQueryParams = {
    ...queryParams,
  }

  updatedQueryParams = {
    ...updatedQueryParams,
    requireUnique: {
      description: 'If set resource should not exist in database',
      schema: {
        default: false,
        type: 'boolean',
      },
    },
  }

  const operationType = 'validate'

  return {
    ...rest,
    errors,
    method: 'post',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
    path: `${basePath}/${resourcePath}/actions/validate`,
    queryParams: updatedQueryParams,
    relations,
    request: {
      examples: exampleRequests,
      format: 'object',
      relations,
    },
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
      relations,
      resource: 'customObject',
      status: 200,
    },
    summary: `Validate ${resource}`,
  }
}
