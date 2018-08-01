const { map: batchMap } = require('common/src/batch')

module.exports = function rebuildCacheViews({ views = [], serviceInteractor }) {
  return batchMap({
    items: views,
    mapFunction: ({ item: viewName }) => {
      return serviceInteractor.rebuildView({
        resource: viewName,
      })
    },
    numberOfEntriesEachBatch: 1,
  })
}
