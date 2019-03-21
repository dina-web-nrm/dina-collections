const createRegexpElasticFilters = require('../utilities/createRegexpElasticFilters')

module.exports = function createTagSearchFilter({
  description,
  fieldPath,
  key,
}) {
  const typePath = `${fieldPath}.tagType`
  const valuePath = `${fieldPath}.tagValue`

  return {
    description: description || `Search ${fieldPath}`,
    elasticsearch: ({ tagType, tagValue }) => {
      const baseQuery = {
        nested: {
          path: fieldPath,
          query: {
            bool: {
              must: [],
            },
          },
        },
      }
      if (tagType) {
        baseQuery.nested.query.bool.must.push({
          match: {
            [typePath]: tagType,
          },
        })
      }

      if (tagValue) {
        const regexpFilters = createRegexpElasticFilters({
          path: valuePath,
          value: tagValue,
        })
        baseQuery.nested.query.bool.must = [
          ...baseQuery.nested.query.bool.must,
          ...regexpFilters,
        ]
      }
      return baseQuery
    },
    inputSchema: {
      type: 'object',
    },
    key,
  }
}
