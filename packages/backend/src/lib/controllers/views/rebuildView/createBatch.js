const readInitialData = require('../../../../utilities/readInitialData')

module.exports = function createBatch({
  numberOfBatchEntries,
  reporter,
  serviceInteractor,
  srcFileName,
  srcRelationships,
  srcResource,
  startCount,
  transformationFunction,
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
        return transformationFunction({
          items: batchItems,
          reporter,
          serviceInteractor,
          startCount,
        })
      })
    })
  }

  let queryParams = {
    limit: numberOfBatchEntries,
    offset: startCount,
  }
  if (srcRelationships && srcRelationships.length) {
    queryParams = {
      ...queryParams,
      relationships: srcRelationships,
    }
  }

  return serviceInteractor
    .getMany({
      request: {
        queryParams,
      },

      resource: srcResource,
    })
    .then(response => {
      const items = response && response.data

      return Promise.resolve().then(() => {
        return transformationFunction({
          items,
          reporter,
          serviceInteractor,
          startCount,
        })
      })
    })
}
