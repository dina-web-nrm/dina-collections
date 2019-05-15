const createRegexpElasticFilters = require('../utilities/createRegexpElasticFilters')

module.exports = function createStringRegexpSearchFilter({
  description,
  fieldPath,
  key,
}) {
  return {
    description: description || `Search ${fieldPath}`,
    elasticsearch: ({ value = 'this-is-not-matching-anything' }) => {
      const baseQuery = {
        bool: {
          must: createRegexpElasticFilters({
            path: fieldPath,
            value,
          }),
        },
      }

      return baseQuery
    },
    inputSchema: {
      type: 'string',
    },
    key,
  }
}
