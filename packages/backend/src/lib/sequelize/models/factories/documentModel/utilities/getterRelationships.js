const mergeNormalizedColumns = require('./mergeNormalizedColumns')

module.exports = function createGetters(normalizedColumnNames = []) {
  if (!(normalizedColumnNames && normalizedColumnNames.length)) {
    return {
      document() {
        const { dataValues } = this
        const { document: doc, relationships } = dataValues
        if (!relationships) {
          return doc
        }

        if (!doc) {
          return { relationships }
        }

        return {
          ...doc,
          relationships,
        }
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
