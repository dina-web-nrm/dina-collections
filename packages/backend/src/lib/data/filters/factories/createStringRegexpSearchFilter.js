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
          must: [],
        },
      }

      const regexpFilters = createRegexpElasticFilters({
        path: fieldPath,
        value,
      })

      baseQuery.bool.must = [...baseQuery.bool.must, ...regexpFilters]

      return baseQuery
    },
    inputSchema: {
      type: 'string',
    },
    key,
  }
}
