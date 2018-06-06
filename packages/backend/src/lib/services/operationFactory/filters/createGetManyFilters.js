const sharedFilters = require('./index')

module.exports = function createGetManyFilters(
  { include = ['ids', 'updatedAfter'], custom = [] } = {}
) {
  const filters = include.map(key => {
    const filter = sharedFilters[key]
    if (!filter) {
      throw new Error(`Unknown filter with key: ${key}`)
    }
    return sharedFilters[key]
  })

  return [...filters, ...custom]
}
