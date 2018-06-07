module.exports = function createBatch({
  serviceInteractor,
  numberOfBatchEntries,
  srcResource,
  startCount,
  mapFunction,
}) {
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
        return mapFunction({ items, serviceInteractor })
      })
    })
    .then(searchItems => {
      return searchItems.map(item => {
        return {
          doc: item,
          id: item.id,
        }
      })
    })
}
