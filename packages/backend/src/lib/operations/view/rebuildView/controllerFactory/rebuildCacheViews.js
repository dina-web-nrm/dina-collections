const { map: batchMap } = require('common/src/batch')

module.exports = function rebuildCacheViews({ views = [], serviceInteractor }) {
  return batchMap({
    items: views,
    mapFunction: ({ item: viewName }) => {
      return serviceInteractor
        .rebuildView({
          resource: viewName,
        })
        .then(report => {
          return {
            report: report.data.attributes,
            resource: viewName,
          }
        })
    },
    numberOfEntriesEachBatch: 1,
  }).then(items => {
    return items.reduce((obj, item) => {
      return {
        ...obj,
        [item.resource]: item.report,
      }
    }, {})
  })
}
