const readInitialData = require('../../../../utilities/readInitialData')

module.exports = function createBatch({
  mapFunction,
  numberOfBatchEntries,
  serviceInteractor,
  srcFileName,
  srcResource,
  startCount,
}) {
  if (srcFileName) {
    return Promise.resolve().then(() => {
      const items = readInitialData(srcFileName)
      if (!items) {
        return items
      }
      const batchItems = items.slice(
        startCount,
        startCount + numberOfBatchEntries
      )
      return Promise.resolve().then(() => {
        return mapFunction({ items: batchItems, serviceInteractor, startCount })
      })
    })
  }

  return serviceInteractor
    .getMany({
      request: {
        queryParams: {
          limit: numberOfBatchEntries,
          offset: startCount,
          relationships: ['all'],
        },
      },

      resource: srcResource,
    })
    .then(response => {
      const items = response && response.data
      return Promise.resolve().then(() => {
        return mapFunction({
          items,
          serviceInteractor,
          startCount,
        })
      })
    })
}
