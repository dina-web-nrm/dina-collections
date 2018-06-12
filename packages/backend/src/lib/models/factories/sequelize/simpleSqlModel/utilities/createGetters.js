const formatAsTimestamp = require('common/src/date/formatAsTimestamp')

module.exports = function createGetters() {
  return {
    document() {
      const { dataValues } = this
      const res = Object.keys(dataValues).reduce((obj, key) => {
        if (key === 'diff') {
          return obj
        }
        if (key === 'schemaCompliant') {
          return obj
        }

        const value = dataValues[key]

        if (value !== null) {
          const isDate = value instanceof Date
          if (isDate) {
            obj[key] = formatAsTimestamp(value) // eslint-disable-line no-param-reassign
          } else {
            obj[key] = value // eslint-disable-line no-param-reassign
          }
        }
        return obj
      }, {})
      return res
    },
  }
}
