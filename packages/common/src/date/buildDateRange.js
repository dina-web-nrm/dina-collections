const getTimestampFromYMD = require('./getTimestampFromYMD')

const DATE_TYPES = ['latest', 'range', 'single']

module.exports = function buildDateRange({
  startDay,
  startMonth,
  startYear,

  endDay,
  endMonth,
  endYear,
  dateType,

  dateText,
  remarks,
}) {
  if (!DATE_TYPES.includes(dateType)) {
    throw new Error(`Unknown dataType: ${dateType}`)
  }

  const range = {}
  if (startDay || startMonth || startYear) {
    const interpretedTimestamp = getTimestampFromYMD({
      day: startDay,
      isStartDate: true,
      month: startMonth,
      year: startYear,
    })
    range.startDate = {
      interpretedTimestamp,
      startDay,
      startMonth,
      startYear,
    }
  }

  if (remarks) {
    range.remarks = remarks
  }

  if (endDay || endMonth || endYear) {
    const interpretedTimestamp = getTimestampFromYMD({
      day: endDay,
      isEndDate: true,
      month: endMonth,
      year: endYear,
    })
    range.endDate = {
      endDay,
      endMonth,
      endYear,
      interpretedTimestamp,
    }
  }

  if (dateText) {
    range.dateText = dateText
  }

  return Object.keys(range).length ? range : null
}
