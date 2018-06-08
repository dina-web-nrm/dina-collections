const includeItem = require('../includeItem')

module.exports = function filterSync({ items, query, filterFunctions }) {
  if (!filterFunctions) {
    throw new Error('No filter functions provided')
  }

  return items
    .filter(item => {
      return includeItem({ filterFunctions, item, query })
    })
    .map(item => {
      return item.id
    })
}
