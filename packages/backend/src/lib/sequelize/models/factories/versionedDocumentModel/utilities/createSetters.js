const extractNormalizedColumns = require('./extractNormalizedColumns')

module.exports = function createSetters(normalizedColumnNames) {
  if (!(normalizedColumnNames && normalizedColumnNames.length)) {
    return {}
  }
  return {
    document(doc) {
      console.log('doc', doc)
      console.log('normalizedColumnNames', normalizedColumnNames)
      const normalizedColumns = extractNormalizedColumns({
        doc,
        normalizedColumnNames,
      })

      console.log('normalizedColumns', normalizedColumns)
      Object.keys(normalizedColumns).forEach(key => {
        this.setDataValue(key, normalizedColumns[key])
      })
    },
  }
}
