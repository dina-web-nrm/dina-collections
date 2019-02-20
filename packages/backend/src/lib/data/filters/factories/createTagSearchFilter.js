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
        const assumeExactValue = tagValue.indexOf('[') !== -1

        if (assumeExactValue) {
          baseQuery.nested.query.bool.must.push({
            match_phrase_prefix: {
              [valuePath]: {
                query: tagValue.toLowerCase(),
              },
            },
          })
        } else {
          const tagValueSegments = tagValue
            .split(/[\s\\/-]+/)
            .filter(segment => {
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
      }
      return baseQuery
    },
    inputSchema: {
      type: 'object',
    },
    key,
  }
}
