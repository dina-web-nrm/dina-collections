const moment = require('moment')

const buildYYYYMMDD = require('./buildYYYYMMDD')

const monthToDaysMap = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
}

const getEndDateSuggestion = ({ day, month, year }) => {
  const isLeapYear = moment([year]).isLeapYear()

  if (year && month && day) {
    return buildYYYYMMDD({
      day,
      month,
      year,
    })
  }

  if (year && month) {
    return buildYYYYMMDD({
      day: month === 2 && isLeapYear ? 29 : monthToDaysMap[month],
      month,
      year,
    })
  }

  return buildYYYYMMDD({
    day: 31,
    month: 12,
    year,
  })
}

const getStartDateSuggestion = ({ day, month, year }) => {
  if (year && month && day) {
    return buildYYYYMMDD({
      day,
      month,
      year,
    })
  }

  if (year && month) {
    return buildYYYYMMDD({
      day: 1,
      month,
      year,
    })
  }

  return buildYYYYMMDD({
    day: 1,
    month: 1,
    year,
  })
}

const getDateSuggestion = ({ day, isEndDate, isStartDate, month, year }) => {
  if (!year || `${year}`.length !== 4) {
    return undefined
  }

  if (isStartDate) {
    return getStartDateSuggestion({
      day,
      month,
      year,
    })
  }

  if (isEndDate) {
    return getEndDateSuggestion({
      day,
      month,
      year,
    })
  }

  return buildYYYYMMDD({
    day,
    month,
    year,
  })
}

module.exports = function getTimestampFromYMD({
  day,
  isEndDate,
  isStartDate,
  month,
  year,
}) {
  const YYYYMMDD = getDateSuggestion({
    day,
    isEndDate,
    isStartDate,
    month,
    year,
  })

  if (!YYYYMMDD) {
    return undefined
  }

  const now = moment()
  const isCurrentDay = now.isSame(YYYYMMDD, 'day')
  const isCurrentMonth = now.isSame(YYYYMMDD, 'month')
  const isCurrentYear = now.isSame(YYYYMMDD, 'year')

  let interpretedTimestamp

  if (isEndDate) {
    if (isCurrentDay || (!day && isCurrentMonth) || (!month && isCurrentYear)) {
      interpretedTimestamp = now
    } else {
      interpretedTimestamp = moment(YYYYMMDD).endOf('date')
    }
  } else {
    interpretedTimestamp = moment(YYYYMMDD).startOf('date')
  }

  return interpretedTimestamp.isValid()
    ? interpretedTimestamp.toISOString()
    : undefined
}
