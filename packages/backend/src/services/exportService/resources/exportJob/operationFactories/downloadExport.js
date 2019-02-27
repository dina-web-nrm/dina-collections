const buildOperationId = require('common/src/buildOperationId')

module.exports = function startJob({
  basePath,
  errors: errorsInput = {},
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

  const operationType = 'downloadExport'

  return {
    ...rest,
    controller: 'downloadExport',
    errors,
    method: 'get',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
    path: `${basePath}/${resourcePath}/{id}/actions/downloadExport/{filePath}`,
    pathParams: ['id', 'filePath'],
    queryParams,
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
      status: 201,
    },
    summary: `Download export `,
  }
}
