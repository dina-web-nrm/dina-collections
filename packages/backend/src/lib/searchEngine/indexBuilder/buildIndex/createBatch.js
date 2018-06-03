const coreToNested = require('common/src/formatObject/coreToNested')
const mapSync = require('common/src/search/map/sync')

module.exports = function createBatch({
  dataInterface,
  numberOfBatchEntries,
  searchResource,
  srcResource,
  startCount,
}) {
  return dataInterface
    .getItems({
      limit: numberOfBatchEntries,
      offset: startCount,
      relationships: ['all'],
      type: srcResource,
    })
    .then(items => {
      const nestedItems = items.data.map(item => {
        return coreToNested({
          getItemByTypeId: dataInterface.getItemByTypeIdSync,
          item,
          type: srcResource,
        })
      })

      return mapSync({
        items: nestedItems,
        resource: searchResource,
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
