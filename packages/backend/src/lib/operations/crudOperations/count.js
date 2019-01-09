const addFieldsToQueryParams = require('./utilities/addFieldsToQueryParams')
const addQueryParamsFromFilterSpecifications = require('./utilities/addQueryParamsFromFilterSpecifications')
const buildOperationId = require('common/src/buildOperationId')
const createGetManyFilterSpecifications = require('../../data/filters/utilities/createGetManyFilterSpecifications')

module.exports = function count({
  availableExamples,
  basePath,
  errors: errorsInput = {},
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

  let queryParams = addQueryParamsFromFilterSpecifications({
    filterSpecification,
  })

  queryParams = addFieldsToQueryParams({
    queryParams,
    selectableFields,
  })

  const errors = {
    '400': ['REQUEST_ERROR'],
    '500': ['RESPONSE_VALIDATION_ERROR', 'INTERNAL_SERVER_ERROR'],
    ...errorsInput,
  }

  const operationType = 'count'

  return {
    ...rest,
    errors,
    filterSpecification,
    includeRelations,
    method: 'get',
    operationId: operationId || buildOperationId({ operationType, resource }),
    operationType,
    path: `${basePath}/${resourcePath}/actions/count`,
    queryParams,
    relations,
    resource,
    response: {
      format: 'object',
      resource: 'customObject',
    },
    selectableFields,
    sortableFields,
    summary: `Count ${resourcePath}`,
  }
}
