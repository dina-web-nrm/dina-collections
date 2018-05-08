module.exports = function extractNormalizedColumns({
  dataValues,
  normalizedColumnNames,
}) {
  if (!dataValues) {
    return dataValues
  }

  return Object.keys(dataValues).reduce((normalizedValues, key) => {
    if (normalizedColumnNames.includes(key)) {
      if (!dataValues[key]) {
        return normalizedValues
      }
      return {
        ...normalizedValues,
        [key]: dataValues[key],
      }
    }
    return normalizedValues
  }, {})
}
