const buildOperationId = require('../../buildOperationId')
const createOperationSpecificQueryParams = require('../utilities/createOperationSpecificQueryParams')
const createRelationSpecification = require('../utilities/createRelationSpecification')
const fetchIncluded = require('./fetchIncluded')

module.exports = function getOne({ openApiClient, resourceType, userOptions }) {
  const { queryParams, pathParams } = userOptions
  const relationSpecification = createRelationSpecification(queryParams)

  return openApiClient
    .call(
      buildOperationId({
        operationType: 'getOne',
        resource: resourceType,
      }),
      {
        pathParams,
        queryParams: createOperationSpecificQueryParams({
          path: '.',
          queryParams,
          relationSpecification,
        }),
      }
    )
    .then(response => {
      return fetchIncluded({
        items: [response.data],
        openApiClient,
        relationSpecification,
      }).then(included => {
        return {
          ...response,
          included,
        }
      })
    })
}
