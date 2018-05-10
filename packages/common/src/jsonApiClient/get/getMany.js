const buildOperationId = require('../../buildOperationId')
const createOperationSpecificQueryParams = require('../utilities/createOperationSpecificQueryParams')
const createRelationSpecification = require('../utilities/createRelationSpecification')
const fetchIncluded = require('./fetchIncluded')

module.exports = function getMany({
  openApiClient,
  resourceType,
  userOptions,
}) {
  const { queryParams } = userOptions
  const relationSpecification = createRelationSpecification(queryParams)

  const mappedQueryParams = createOperationSpecificQueryParams({
    path: '.',
    queryParams,
    relationSpecification,
  })
  return openApiClient
    .call(
      buildOperationId({
        operationType: 'getMany',
        resource: resourceType,
      }),
      {
        queryParams: mappedQueryParams,
      }
    )
    .then(response => {
      return fetchIncluded(response.data).then(included => {
        return {
          ...response,
          included,
        }
      })
    })
}
