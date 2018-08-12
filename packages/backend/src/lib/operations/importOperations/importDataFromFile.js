const addRelationsToQueryParams = require('../crudOperations/utilities/addRelationsToQueryParams')
const addLimitToQueryParams = require('../crudOperations/utilities/addLimitToQueryParams')
const buildOperationId = require('common/src/buildOperationId')

module.exports = function rebuildView({
  basePath,
  errors: errorsInput = {},
  operationId,
  resource,
  relations,
  includeRelations,
  queryParams: queryParamsInput,
  resourcePath,
  ...rest
}) {
  const errors = {
    '403': ['FORBIDDEN_ERROR'],
    '500': ['INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }

  let queryParams = addRelationsToQueryParams({
    includeRelations,
    queryParams: queryParamsInput,
    relations,
  })

  queryParams = addLimitToQueryParams({
    queryParams,
  })

  const operationType = 'importDataFromFile'

  return {
    ...rest,
    errors,
    includeRelations,
    method: 'post',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
    path: `${basePath}/${resourcePath}/actions/importDataFromFile`,
    queryParams,
    relations,
    resource,
    response: {
      format: 'object',
      resource: 'customObject',
    },
    summary: `Rebuild view for resource ${resource}`,
  }
}
