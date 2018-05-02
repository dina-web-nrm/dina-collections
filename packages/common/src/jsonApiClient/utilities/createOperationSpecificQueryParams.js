const getRelativeRelationships = require('./getRelativeRelationships')

module.exports = function createOperationSpecificQueryParams({
  path,
  queryParams,
  relationSpecification,
}) {
  const operationSpecificQueryParams = {
    ...queryParams,
  }
  delete operationSpecificQueryParams.relationships
  delete operationSpecificQueryParams.includes

  const relativeRelationships = getRelativeRelationships({
    path,
    relationSpecification,
  })

  if (relativeRelationships) {
    return {
      ...operationSpecificQueryParams,
      relationships: relativeRelationships, // TODO check for false
    }
  }
  return operationSpecificQueryParams
}
