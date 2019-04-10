const buildOperationId = require('common/src/buildOperationId')

module.exports = function emptyView({
  basePath,
  errors: errorsInput = {},
  operationId,
  resource,
  relations,
  resourcePath,
  ...rest
}) {
  const errors = {
    '403': ['FORBIDDEN_ERROR'],
    '500': ['INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }

  const operationType = 'emptyView'

  return {
    ...rest,
    errors,
    method: 'post',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
    path: `${basePath}/${resourcePath}/actions/emptyView`,
    relations,
    resource,
    response: {
      format: 'object',
      resource: 'customObject',
    },
    summary: `Empty view for resource ${resource}`,
  }
}
