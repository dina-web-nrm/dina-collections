const moment = require('moment')

module.exports = function getCurrentUTCTimestamp() {
  return moment.utc().format(moment.defaultFormatUtc)
}
