const buildOperationId = require('common/src/buildOperationId')

module.exports = function del({
  basePath,
  errors: errorsInput = {},
  exampleResponses = {},
  operationId,
  resource,
  relations,
  resourcePath,
  ...rest
}) {
  const errors = {
    '400': ['REQUEST_BODY_VALIDATION_ERROR', 'REQUEST_ERROR'],
    '403': ['FORBIDDEN_ERROR'],
    '404': ['RESOURCE_NOT_FOUND_ERROR'],
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }

  const operationType = 'del'

  return {
    ...rest,
    errors,
    method: 'delete',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
    path: `${basePath}/${resourcePath}/{id}`,
    pathParams: ['id'],
    relations,
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
      relations,
    },
    summary: `Deletes ${resource}`,
  }
}
