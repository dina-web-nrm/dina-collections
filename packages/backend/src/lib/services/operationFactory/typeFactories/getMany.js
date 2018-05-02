const addOffsetToQueryParams = require('./utilities/addOffsetToQueryParams')
const addLimitToQueryParams = require('./utilities/addLimitToQueryParams')
const addRelationsToQueryParams = require('./utilities/addRelationsToQueryParams')
const capitalizeFirstLetter = require('common/src/stringFormatters/capitalizeFirstLetter')

module.exports = function getMany({
  basePath,
  errors: errorsInput = {},
  exampleResponses = {},
  includeRelations,
  operationId,
  queryParams: queryParamsInput,
  relations,
  resource,
  resourcePath,
  ...rest
}) {
  let queryParams = addRelationsToQueryParams({
    includeRelations,
    queryParams: queryParamsInput,
    relations,
  })

  queryParams = addLimitToQueryParams({
    queryParams,
  })

  queryParams = addOffsetToQueryParams({
    queryParams,
  })

  const errors = {
    '400': ['REQUEST_ERROR'],
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }
  return {
    ...rest,
    errors,
    includeRelations,
    method: 'get',
    operationId: operationId || `get${capitalizeFirstLetter(resourcePath)}`,
    operationType: 'getMany',
    path: `${basePath}/${resourcePath}`,
    queryParams,
    relations,
    resource,
    response: {
      examples: exampleResponses,
      format: 'array',
      relations,
    },
    summary: `Find ${resourcePath}`,
  }
}
