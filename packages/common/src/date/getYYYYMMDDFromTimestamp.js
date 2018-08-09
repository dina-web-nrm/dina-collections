const moment = require('moment')

module.exports = function getYYYYMMDDFromTimestamp(timestamp) {
  return moment(timestamp).format('YYYY-MM-DD')
}
