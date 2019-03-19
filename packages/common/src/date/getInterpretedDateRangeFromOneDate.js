const buildDateRange = require('./buildDateRange')
const getEarliestTimestamp = require('./getEarliestTimestamp')
const getInterpretedTimestampFromYMD = require('./getInterpretedTimestampFromYMD')
const { LATEST, SINGLE } = require('./constants')

module.exports = function getInterpretedDateRangeFromOneDate({
  dateType,
  day: dayInput,
  month: monthInput,
  year: yearInput,
  ...rest
}) {
  if (!dateType) {
    return buildDateRange({
      ...rest,
    })
  }

  const day = dayInput ? Number(dayInput) : undefined
  const month = monthInput ? Number(monthInput) : undefined
  const year = yearInput ? Number(yearInput) : undefined

  if (dateType === LATEST) {
    return buildDateRange({
      ...rest,
      dateType,

      endDay: day,
      endInterpretedTimestamp: getInterpretedTimestampFromYMD({
        day,
        isEndDate: true,
        month,
        moveCurrentYearEndDateToNow: true,
        year,
      }),
      endMonth: month,
      endYear: year,

      startInterpretedTimestamp: getEarliestTimestamp(),
    })
  }

  if (dateType === SINGLE) {
    return buildDateRange({
      ...rest,
      dateType,

      endDay: day,
      endInterpretedTimestamp: getInterpretedTimestampFromYMD({
        day,
        isEndDate: true,
        month,
        moveCurrentYearEndDateToNow: true,
        year,
      }),
      endMonth: month,
      endYear: year,

      startDay: day,
      startInterpretedTimestamp: getInterpretedTimestampFromYMD({
        day,
        isStartDate: true,
        month,
        year,
      }),
      startMonth: month,
      startYear: year,
    })
  }

  throw new Error(
    `dateType ${dateType} not compatible with getInterpretedDateRangeFromOneDate. maybe you should use getInterpretedDateRangeFromTwoDates?`
  )
}
