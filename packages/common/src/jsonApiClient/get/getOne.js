const createLog = require('../../log')
const buildOperationId = require('../../buildOperationId')
const createOperationSpecificQueryParams = require('../utilities/createOperationSpecificQueryParams')
const createRelationSpecification = require('../utilities/createRelationSpecification')
const fetchIncluded = require('./fetchIncluded')

const defaultLog = createLog('common:jsonApiClient:getOne')
module.exports = function getOne({
  openApiClient,
  resourceType,
  userOptions,
  log = defaultLog,
}) {
  const { queryParams, pathParams } = userOptions

  log.debug(`getOne: start. id: ${pathParams.id} queryParams:`, queryParams)

  const relationSpecification = createRelationSpecification(queryParams)
  const mappedQueryParams = createOperationSpecificQueryParams({
    path: '.',
    queryParams,
    relationSpecification,
  })

  return openApiClient
    .call(
      buildOperationId({
        operationType: 'getOne',
        resource: resourceType,
      }),
      {
        pathParams,
        queryParams: mappedQueryParams,
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
          included: included.map(item => {
            delete item.path // eslint-disable-line
            return item
          }),
        }
      })
    })
}
