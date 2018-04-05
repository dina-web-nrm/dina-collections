const mergeNormalizedColumns = require('./mergeNormalizedColumns')

module.exports = function createGetters(normalizedColumnNames) {
  if (!(normalizedColumnNames && normalizedColumnNames.length)) {
    return {}
  }
  return {
    document() {
      const { dataValues } = this
      return mergeNormalizedColumns({
        dataValues,
        normalizedColumnNames,
      })
    },
  }
}
