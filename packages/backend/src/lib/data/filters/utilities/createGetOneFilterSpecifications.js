const sharedFilters = require('../sharedFilters')

module.exports = function createGetOneFilterSpecifications({
  include: includeInput = ['id', 'updatedAfter'],
  custom = {},
} = {}) {
  const include = includeInput
  if (!include.includes('id')) {
    include.push('id')
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
