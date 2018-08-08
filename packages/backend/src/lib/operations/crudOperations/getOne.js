const buildOperationId = require('common/src/buildOperationId')
const addRelationsToQueryParams = require('./utilities/addRelationsToQueryParams')
const addMockToQueryParams = require('./utilities/addMockToQueryParams')
const addExampleToQueryParams = require('./utilities/addExampleToQueryParams')
const addFieldsToQueryParams = require('./utilities/addFieldsToQueryParams')

module.exports = function getOne({
  availableExamples,
  basePath,
  errors: errorsInput = {},
  exampleResponses = {},
  fieldsSpecification,
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

  queryParams = addFieldsToQueryParams({
    fieldsSpecification,
    queryParams,
  })

  queryParams = addMockToQueryParams({
    includeRelations,
    queryParams,
    relations,
  })

  queryParams = addExampleToQueryParams({
    availableExamples,
    queryParams,
  })

  const errors = {
    '400': ['REQUEST_ERROR'],
    '404': ['RESOURCE_NOT_FOUND_ERROR'],
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }

  const operationType = 'getOne'

  return {
    ...rest,
    errors,
    fieldsSpecification,
    includeRelations,
    method: 'get',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
    path: `${basePath}/${resourcePath}/{id}`,
    pathParams: ['id'],
    queryParams,
    relations,
    resource,
    response: {
      examples: exampleResponses,
      format: 'object',
      relations,
    },
    summary: `Find ${resource} by id`,
  }
}
