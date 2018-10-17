module.exports = function createFeatureRangeFilter({ description, fieldPath }) {
  const rangeValuePath = `${fieldPath}.rangeValue`
  const rangeUnitPath = `${fieldPath}.rangeUnit.raw`
  const tagTypePath = `${fieldPath}.tagType.raw`

  return {
    description: description || `Match for ${fieldPath}`,
    elasticsearch: ({ value = {} }) => {
      const { min, max, tagTypes, rangeUnit } = value
      const must = []
      if (min || max) {
        must.push({
          range: {
            [`${rangeValuePath}`]: {
              gte: min || undefined,
              lte: max || undefined,
            },
          },
        })
      }

      if (tagTypes && tagTypes.length) {
        must.push({
          terms: { [`${tagTypePath}`]: tagTypes },
        })
      }

      if (rangeUnit) {
        must.push({
          term: { [`${rangeUnitPath}`]: rangeUnit },
        })
      }

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
    },
    inputSchema: {
      type: 'object',
    },
  }
}
