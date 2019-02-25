const sharedFilters = require('../sharedFilters')

module.exports = function createGetManyFilterSpecifications({
  include = ['ids', 'updatedAfter'],
  custom = {},
} = {}) {
  if (!include.includes('ids')) {
    include.push('ids')
  }
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
