module.exports = function createTagMatchFilter({
  description,
  fieldPath,
  key,
}) {
  const typePath = `${fieldPath}.tagType`
  const valuePath = `${fieldPath}.tagValue`

  return {
    description: description || `Search ${fieldPath}`,
    elasticsearch: ({ value }) => {
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

      if (value.tagType) {
        baseQuery.nested.query.bool.must.push({
          match: {
            [typePath]: {
              query: value.tagType,
            },
          },
        })
      }

      if (value.tagValue) {
        baseQuery.nested.query.bool.must.push({
          match: {
            [valuePath]: {
              query: value.tagValue,
            },
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
