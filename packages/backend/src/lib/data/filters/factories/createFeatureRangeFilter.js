const isRangeNumberInvalid = number => {
  if (number === undefined) {
    return false
  }
  if (number && `${number}`.includes('e')) {
    return true
  }
  if (Number.isNaN(Number(number)) || number === null) {
    return true
  }
  return number < 0
}

module.exports = function createFeatureRangeFilter({ description, fieldPath }) {
  const rangeValuePath = `${fieldPath}.rangeValue`
  const rangeUnitPath = `${fieldPath}.rangeUnit`
  const tagTypePath = `${fieldPath}.tagType`

  return {
    description: description || `Match for ${fieldPath}`,
    elasticsearch: ({ value = {} }) => {
      const { min, max, tagType, rangeUnit } = value
      const mustNot = []

      const must = []
      if (min !== undefined || max !== undefined) {
        if (isRangeNumberInvalid(min) || isRangeNumberInvalid(max)) {
          mustNot.push({
            match_all: {},
          })
        } else {
          must.push({
            range: {
              [`${rangeValuePath}`]: {
                gte: min,
                lte: max,
              },
            },
          })
        }
      }

      if (tagType) {
        must.push({
          term: { [`${tagTypePath}`]: tagType },
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
              mustNot,
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
