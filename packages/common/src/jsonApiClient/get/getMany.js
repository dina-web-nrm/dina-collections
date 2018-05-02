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

  return openApiClient
    .call(
      buildOperationId({
        operationType: 'getMany',
        resource: resourceType,
      }),
      {
        queryParams: createOperationSpecificQueryParams({
          path: '.',
          queryParams,
          relationSpecification,
        }),
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
