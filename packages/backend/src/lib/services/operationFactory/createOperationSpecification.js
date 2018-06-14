const createGetManyFilters = require('./filters/createGetManyFilters')

module.exports = function createOperationObjectSpecification({
  operationSpecificationInput,
  resourceSpecification,
}) {
  const {
    connect = true,
    exampleResponses,
    queryParams,
    filters: filtersInput,
  } = operationSpecificationInput

  const filters = filtersInput || createGetManyFilters()

  const availableExamples = Object.keys(exampleResponses || {})

  // TODO add id
  return {
    ...operationSpecificationInput,
    ...resourceSpecification,
    availableExamples,
    connect,
    filters,
    queryParams,
  }
}
