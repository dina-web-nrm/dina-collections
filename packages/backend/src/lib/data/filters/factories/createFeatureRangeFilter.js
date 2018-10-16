module.exports = function createFeatureRangeFilter({ description, fieldPath }) {
  const rangeValuePath = `${fieldPath}.rangeValue`
  const rangeUnitPath = `${fieldPath}.rangeUnit.raw`
  const rangeTypePath = `${fieldPath}.rangeType.raw`

  return {
    description: description || `Match for ${fieldPath}`,
    elasticsearch: ({ value = {} }) => {
      const { min, max, rangeTypes, rangeUnit } = value
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

      if (rangeTypes && rangeTypes.length) {
        must.push({
          terms: { [`${rangeTypePath}`]: rangeTypes },
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
