const { execute: batchExecute } = require('common/src/batch')

module.exports = function createResourceBatchExecute({ call }) {
  return function resourceBatchExecute({
    execute,
    numberOfEntriesEachBatch = 100,
    request = {},
    resource,
  }) {
    const createBatch = ({ numberOfBatchEntries, startCount }) => {
      const queryParams = {
        limit: numberOfBatchEntries,
        offset: startCount,
        ...(request.queryParams || {}),
      }
      return call({
        operationType: 'getMany',
        request: {
          ...request,
          queryParams,
        },
        resource,
      }).then(response => {
        return response.data
      })
    }

    return batchExecute({
      createBatch,
      execute,
      numberOfEntries: 100000,
      numberOfEntriesEachBatch,
    })
  }
}
