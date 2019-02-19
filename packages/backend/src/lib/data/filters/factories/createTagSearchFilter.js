module.exports = function createTagSearchFilter({
  description,
  fieldPath,
  key,
}) {
  const typePath = `${fieldPath}.tagType.raw`
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
        const tagValueSegments = tagValue.split(' ').filter(segment => {
          return !!segment
        })

        tagValueSegments.forEach(segment => {
          baseQuery.nested.query.bool.must.push({
            wildcard: {
              [valuePath]: segment.toLowerCase(),
            },
          })
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
