const readInitialData = require('../../../../utilities/readInitialData')

module.exports = function createBatch({
  fileName,
  mapFunction,
  numberOfBatchEntries,
  serviceInteractor,
  startCount,
}) {
  return Promise.resolve().then(() => {
    const items = readInitialData(fileName)
    if (!items) {
      return items
    }
    const batchItems = items.slice(
      startCount,
      startCount + numberOfBatchEntries
    )
    return Promise.resolve().then(() => {
      return mapFunction({ items: batchItems, serviceInteractor })
    })
  })
}
