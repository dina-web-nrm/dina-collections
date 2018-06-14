const moment = require('moment')

module.exports = function formatAsTimestamp(dateValue) {
  return moment(dateValue).format(moment.defaultFormatUtc)
}
