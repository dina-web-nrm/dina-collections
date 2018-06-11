const moment = require('moment')

module.exports = function createGetters() {
  return {
    document() {
      const { dataValues } = this
      const res = Object.keys(dataValues).reduce((obj, key) => {
        const value = dataValues[key]

        if (value !== null) {
          const isDate = value instanceof Date
          if (isDate) {
            obj[key] = moment(value).format() // eslint-disable-line no-param-reassign
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
