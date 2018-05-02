const createOperationId = require('../utilities/createOperationId')
const createOperationSpecificQueryParams = require('../utilities/createOperationSpecificQueryParams')

module.exports = function runIncludeJobs({
  includeJobs,
  openApiClient,
  relationSpecification,
}) {
  const promises = includeJobs.map(includeJob => {
    const { path, ids, type } = includeJob

    return openApiClient
      .call({
        operationId: createOperationId('getMany', type),
        queryParams: createOperationSpecificQueryParams({
          path,
          queryParams: {
            filter: {
              ids,
            },
          },
          relationSpecification,
        }),
      })
      .then(response => {
        const items = response.data
        return items.map(item => {
          return {
            ...item,
            path,
          }
        })
      })
  })

  return Promise.all(promises).then(includes => {
    return [...includes]
  })
}
