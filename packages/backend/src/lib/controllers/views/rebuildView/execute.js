module.exports = function execute({
  collidingIdPrefix,
  model,
  items,
  reporter,
}) {
  const filteredItems = items.filter(item => {
    if (!item) {
      return false
    }

    if (!(item.id || item.attributes)) {
      return false
    }

    return true
  })

  if (reporter) {
    reporter.increment({
      count: filteredItems.length,
      path: 'transformations.nTargetItems',
    })
  }

  return model
    .bulkCreate({ collidingIdPrefix, items: filteredItems })
    .then(() => {
      return filteredItems
    })
}
