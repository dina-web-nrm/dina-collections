const moment = require('moment')

module.exports = function getCurrentYear() {
  return moment.utc().year()
}
