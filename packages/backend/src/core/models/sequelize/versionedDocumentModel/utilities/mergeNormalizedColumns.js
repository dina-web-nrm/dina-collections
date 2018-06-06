module.exports = function extractNormalizedColumns({
  dataValues,
  normalizedColumnNames,
}) {
  if (!dataValues) {
    return dataValues
  }

  return Object.keys(dataValues).reduce((normalizedValues, key) => {
    if (normalizedColumnNames.includes(key)) {
      if (key === 'relationships') {
        return {
          ...normalizedValues,
          [key]: dataValues[key],
        }
      }
      if (!dataValues[key]) {
        return normalizedValues
      }
      return {
        ...normalizedValues,
        normalized: {
          ...(normalizedValues.normalized || {}),
          [key]: dataValues[key],
        },
      }
    }
    if (key === 'nonNormalized') {
      return {
        ...dataValues[key],
        ...normalizedValues,
      }
    }

    return normalizedValues
  }, {})
}
