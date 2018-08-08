const createGetManyFilterSpecifications = require('../../data/filters/utilities/createGetManyFilterSpecifications')
const addLimitToQueryParams = require('./utilities/addLimitToQueryParams')
const addOffsetToQueryParams = require('./utilities/addOffsetToQueryParams')
const addRelationsToQueryParams = require('./utilities/addRelationsToQueryParams')
const addQueryParamsFromFilterSpecifications = require('./utilities/addQueryParamsFromFilterSpecifications')
const addMockToQueryParams = require('./utilities/addMockToQueryParams')
const addExampleToQueryParams = require('./utilities/addExampleToQueryParams')
const buildOperationId = require('common/src/buildOperationId')
const addFieldsToQueryParams = require('./utilities/addFieldsToQueryParams')
const addSortingToQueryParams = require('./utilities/addSortingToQueryParams')

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
