const sharedFilters = require('../sharedFilters')

module.exports = function createGetManyFilterSpecifications(
  { include = ['ids', 'updatedAfter', 'deactivated'], custom = {} } = {}
) {
  const filters = include.reduce((obj, key) => {
    const filter = sharedFilters[key]
    if (!filter) {
      throw new Error(`Unknown filter with key: ${key}`)
    }
    return {
      ...obj,
      [key]: filter,
    }
  }, {})

  return {
    filters: { ...filters, ...custom },
  }
}
