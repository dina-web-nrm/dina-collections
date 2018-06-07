const buildOperationId = require('common/src/buildOperationId')

module.exports = function requestRebuildView({
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

  const operationType = 'requestRebuildView'

  return {
    ...rest,
    errors,
    method: 'post',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
    path: `${basePath}/${resourcePath}/actions/requestRebuildView`,
    relations,
    resource,
    response: {
      format: 'object',
      resource: 'customObject',
    },
    summary: `Rebuild view for resource ${resource}`,
  }
}
