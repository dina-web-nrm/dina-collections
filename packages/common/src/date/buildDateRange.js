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
      day: startDay ? Number(startDay) : undefined,
      interpretedTimestamp,
      month: startMonth ? Number(startMonth) : undefined,
      year: startYear ? Number(startYear) : undefined,
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
      day: endDay ? Number(endDay) : undefined,
      interpretedTimestamp,
      month: endMonth ? Number(endMonth) : undefined,
      year: endYear ? Number(endYear) : undefined,
    }
  }

  if (dateText) {
    range.dateText = dateText
  }

  return Object.keys(range).length ? range : null
}
