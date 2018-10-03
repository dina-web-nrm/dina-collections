const addExampleToQueryParams = require('./utilities/addExampleToQueryParams')
const addFieldsToQueryParams = require('./utilities/addFieldsToQueryParams')
const addIncludeDeactivatedQueryParam = require('./utilities/addIncludeDeactivatedQueryParam')
const addMockToQueryParams = require('./utilities/addMockToQueryParams')
const addQueryParamsFromFilterSpecifications = require('./utilities/addQueryParamsFromFilterSpecifications')
const addRelationsToQueryParams = require('./utilities/addRelationsToQueryParams')
const buildOperationId = require('common/src/buildOperationId')
const createGetOneFilterSpecifications = require('../../data/filters/utilities/createGetOneFilterSpecifications')

module.exports = function getOne({
  availableExamples,
  basePath,
  errors: errorsInput = {},
  exampleResponses = {},
  filterSpecification: filterSpecificationInput,
  includeRelations,
  operationId: operationIdInput,
  queryParams: queryParamsInput,
  relations,
  resource,
  resourcePath,
  selectableFields,
  ...rest
}) {
  const filterSpecification =
    filterSpecificationInput || createGetOneFilterSpecifications()
  const operationType = 'getOne'
  const operationId =
    operationIdInput || buildOperationId({ operationType, resource })

  let queryParams = addRelationsToQueryParams({
    includeRelations,
    queryParams: queryParamsInput,
    relations,
  })

  queryParams = addIncludeDeactivatedQueryParam({
    queryParams,
  })

  queryParams = addQueryParamsFromFilterSpecifications({
    filterSpecification,
    ignore: ['id'],
    queryParams,
  })

  queryParams = addFieldsToQueryParams({
    queryParams,
    selectableFields,
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

  return {
    ...rest,
    errors,
    filterSpecification,
    includeRelations,
    method: 'get',
    operationId,
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
    selectableFields,
    summary: `Find ${resource} by id`,
  }
}
