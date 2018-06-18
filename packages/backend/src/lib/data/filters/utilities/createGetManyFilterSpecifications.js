const sharedFilters = require('../sharedFilterSpecifications')

module.exports = function createGetManyFilterSpecifications(
  { include = ['ids', 'updatedAfter'], custom = {} } = {}
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

  return { ...filters, ...custom }
}
