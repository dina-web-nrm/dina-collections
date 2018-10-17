module.exports = function createTagMatchFilter({
  description,
  fieldPath,
  key,
  nested = true,
  tagTypePath = 'tagType',
}) {
  const typePath = nested
    ? `${fieldPath}.${tagTypePath}.raw`
    : `${fieldPath}.raw`
  const valuePath = nested ? `${fieldPath}.tagValue.raw` : `${fieldPath}.raw`

  return {
    description: description || `Search ${fieldPath}`,
    elasticsearch: ({ tagType, tagTypes, tagValue }) => {
      const must = []

      if (tagTypes) {
        must.push({
          terms: {
            [typePath]: tagTypes,
          },
        })
      }

      if (tagType) {
        must.push({
          term: {
            [typePath]: tagType,
          },
        })
      }

      if (tagValue) {
        must.push({
          term: {
            [valuePath]: tagValue.toLowerCase(),
          },
        })
      }

      if (nested) {
        return {
          nested: {
            path: fieldPath,
            query: {
              bool: {
                must,
              },
            },
          },
        }
      }
      return {
        bool: {
          must,
        },
      }
    },
    inputSchema: {
      type: 'object',
    },
    key,
  }
}
