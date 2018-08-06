const moment = require('moment')

module.exports = function getTimestampFromYMD({ day, month, year }) {
  if (!(year && `${year}`.length === 4)) {
    return undefined
  }

  const timestamp = moment.utc({
    day,
    month: month !== undefined ? month - 1 : undefined,
    year,
  })

  if (timestamp.isValid()) {
    return timestamp.format()
  }
  return undefined
}
