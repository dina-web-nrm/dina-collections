const addExampleToQueryParams = require('./utilities/addExampleToQueryParams')
const addFieldsToQueryParams = require('./utilities/addFieldsToQueryParams')
const addIncludeDeactivatedQueryParam = require('./utilities/addIncludeDeactivatedQueryParam')
const addLimitToQueryParams = require('./utilities/addLimitToQueryParams')
const addMockToQueryParams = require('./utilities/addMockToQueryParams')
const addOffsetToQueryParams = require('./utilities/addOffsetToQueryParams')
const addQueryParamsFromFilterSpecifications = require('./utilities/addQueryParamsFromFilterSpecifications')
const addRelationsToQueryParams = require('./utilities/addRelationsToQueryParams')
const addSortingToQueryParams = require('./utilities/addSortingToQueryParams')
const buildOperationId = require('common/src/buildOperationId')
const createGetManyFilterSpecifications = require('../../data/filters/utilities/createGetManyFilterSpecifications')

module.exports = function getMany({
  availableExamples,
  basePath,
  errors: errorsInput = {},
  exampleResponses = {},
  filterSpecification: filterSpecificationInput,
  includeRelations,
  operationId,
  queryParams: queryParamsInput,
  relations,
  resource,
  resourcePath,
  selectableFields,
  sortableFields,
  ...rest
}) {
  const filterSpecification =
    filterSpecificationInput || createGetManyFilterSpecifications()

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
    queryParams,
  })

  queryParams = addLimitToQueryParams({
    queryParams,
  })

  queryParams = addOffsetToQueryParams({
    queryParams,
  })

  queryParams = addFieldsToQueryParams({
    queryParams,
    selectableFields,
  })
  queryParams = addSortingToQueryParams({
    queryParams,
    sortableFields,
  })

  queryParams = addMockToQueryParams({
    queryParams,
  })

  queryParams = addExampleToQueryParams({
    availableExamples,
    queryParams,
  })

  const errors = {
    '400': ['REQUEST_ERROR'],
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }

  const operationType = 'getMany'

  return {
    ...rest,
    errors,
    filterSpecification,
    includeRelations,
    method: 'get',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
    path: `${basePath}/${resourcePath}`,
    queryParams,
    relations,
    resource,
    response: {
      examples: exampleResponses,
      format: 'array',
      relations,
    },
    selectableFields,
    sortableFields,
    summary: `Find ${resourcePath}`,
  }
}
