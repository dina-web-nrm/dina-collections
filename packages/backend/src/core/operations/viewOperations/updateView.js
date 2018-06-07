const buildOperationId = require('common/src/buildOperationId')

module.exports = function updateView({
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

  const operationType = 'updateView'

  return {
    ...rest,
    errors,
    method: 'post',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
    path: `${basePath}/${resourcePath}/actions/updateView`,
    relations,
    resource,
    response: {
      format: 'object',
      resource: 'customObject',
    },
    summary: `Rebuild view for resource ${resource}`,
  }
}
