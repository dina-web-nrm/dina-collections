const { DATE_TYPES } = require('./constants')
const createDeleteProperties = require('../createDeleteProperties')

const deleteNullProperties = createDeleteProperties(null)
const deleteUndefinedProperties = createDeleteProperties(undefined)

const getDatePart = ({ day, month, year, timestamp, interpretedTimestamp }) => {
  const datePart = deleteNullProperties(
    deleteUndefinedProperties({
      day,
      interpretedTimestamp,
      month,
      timestamp,
      year,
    })
  )

  return Object.keys(datePart).length ? datePart : undefined
}

module.exports = function buildDateRange({
  startDay,
  startMonth,
  startYear,
  startTimestamp,
  startInterpretedTimestamp,

  endDay,
  endMonth,
  endYear,
  endTimestamp,
  endInterpretedTimestamp,

  dateType,
  dateText,
  remarks,
}) {
  if (dateType && !DATE_TYPES.includes(dateType)) {
    throw new Error(`Unknown dateType: ${dateType}`)
  }

  const dateRange = deleteNullProperties(
    deleteUndefinedProperties({
      dateText,
      dateType,
      endDate: getDatePart({
        day: endDay,
        interpretedTimestamp: endInterpretedTimestamp,
        month: endMonth,
        timestamp: endTimestamp,
        year: endYear,
      }),
      remarks,
      startDate: getDatePart({
        day: startDay,
        interpretedTimestamp: startInterpretedTimestamp,
        month: startMonth,
        timestamp: startTimestamp,
        year: startYear,
      }),
    })
  )

  return Object.keys(dateRange).length ? dateRange : null
}
