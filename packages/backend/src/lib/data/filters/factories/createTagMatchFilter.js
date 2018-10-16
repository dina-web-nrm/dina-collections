module.exports = function createTagMatchFilter({
  description,
  fieldPath,
  key,
}) {
  const typePath = `${fieldPath}.tagType.raw`
  const valuePath = `${fieldPath}.tagValue.raw`

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
          term: {
            [typePath]: tagType,
          },
        })
      }

      if (tagValue) {
        baseQuery.nested.query.bool.must.push({
          term: {
            [valuePath]: tagValue.toLowerCase(),
          },
        })
      }

      return baseQuery
    },
    inputSchema: {
      type: 'object',
    },
    key,
  }
}
