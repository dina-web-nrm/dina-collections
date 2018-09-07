const getCurrentUTCTimestamp = require('common/src/date/getCurrentUTCTimestamp')

module.exports = function createFilePath({ exportResource }) {
  return `exports/${exportResource}-${getCurrentUTCTimestamp()}.csv`
}
