const addRelationsToQueryParams = require('./utilities/addRelationsToQueryParams')
const capitalizeFirstLetter = require('./utilities/capitalizeFirstLetter')

module.exports = function getMany({
  basePath,
  errors: errorsInput = {},
  exampleResponses = {},
  includeRelations,
  operationId,
  queryParams: queryParamsInput,
  relations,
  resource,
  resourcePlural,
  ...rest
}) {
  const queryParams = addRelationsToQueryParams({
    includeRelations,
    queryParams: queryParamsInput,
    relations,
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
    operationId: operationId || `get${capitalizeFirstLetter(resourcePlural)}`,
    operationType: 'getMany',
    path: `${basePath}/${resourcePlural}`,
    queryParams,
    relations,
    resource,
    response: {
      examples: exampleResponses,
      format: 'array',
      relations,
    },
    summary: `Find ${resourcePlural}`,
  }
}
