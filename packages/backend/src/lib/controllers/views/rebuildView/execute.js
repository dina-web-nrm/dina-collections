const {
  bulkCreateResourceActivities,
} = require('../../../../services/historyService/serviceInteractions')

module.exports = function execute({
  collidingIdPrefix,
  items,
  model,
  reporter,
  resource,
  serviceInteractor,
  storeResourceActivity,
}) {
  const filteredItems = items.filter(item => {
    if (!item) {
      return false
    }

    if (!(item.id || item.attributes || item.internals)) {
      return false
    }

    return true
  })

  if (reporter) {
    reporter.rebuildViewIncrementTarget({ items: filteredItems })
  }

  return model
    .bulkCreate({ collidingIdPrefix, items: filteredItems })
    .then(({ items: createdItems }) => {
      if (!storeResourceActivity) {
        return createdItems
      }
      return bulkCreateResourceActivities({
        action: 'create',
        includeDiff: false,
        includeSnapshot: false,
        items: createdItems.map((item, index) => {
          const { meta } = filteredItems[index]
          if (!(meta && meta.sourceData)) {
            return item
          }

          return {
            ...item,
            meta: {
              ...(item.meta || {}),
              sourceData: meta.sourceData,
            },
          }
        }),
        resource,
        serviceInteractor,
      })
    })
}
