const extractNormalizedColumns = require('./extractNormalizedColumns')

module.exports = function createSetters(normalizedColumnNames) {
  if (!(normalizedColumnNames && normalizedColumnNames.length)) {
    return {}
  }
  return {
    document(doc) {
      const normalizedColumns = extractNormalizedColumns({
        doc,
        normalizedColumnNames,
      })
      Object.keys(normalizedColumns).forEach(key => {
        this.setDataValue(key, normalizedColumns[key])
      })
    },
  }
}
