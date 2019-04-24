const mergeNormalizedColumns = require('./mergeNormalizedColumns')

module.exports = function createGetters(normalizedColumnNames = []) {
  if (!(normalizedColumnNames && normalizedColumnNames.length)) {
    return {
      document() {
        const { dataValues } = this
        return dataValues.document
      },
    }
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
