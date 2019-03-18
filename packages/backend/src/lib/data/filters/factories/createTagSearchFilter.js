const createRegexpElasticFilters = require('../utilities/createRegexpElasticFilters')

module.exports = function createTagSearchFilter({
  description,
  fieldPath,
  key,
}) {
  const typePath = `${fieldPath}.tagType.raw`
  const valuePath = `${fieldPath}.tagValue`
  const valueRawPath = `${valuePath}.raw`

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
          path: valueRawPath,
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
