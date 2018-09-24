import moment from 'moment'

import { BEFORE, RANGE, SINGLE } from 'coreModules/form/constants'

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

export const getEarliestTimestamp = () => moment('1600-01-01')

export const isInt = value => {
  return (
    !Number.isNaN(value) &&
    Number.parseInt(Number(value), 10) == value && // eslint-disable-line eqeqeq
    !Number.isNaN(parseInt(value, 10))
  )
}

export const buildYYYYMMDD = ({ day, month, year }) => {
  if (!year) {
    return undefined
  }

  let YYYYMMDD = `${year}`

  if (month) {
    YYYYMMDD = YYYYMMDD.concat(
      `${month}`.length === 1 ? `0${month}` : `${month}`
    )

    if (day) {
      YYYYMMDD = YYYYMMDD.concat(`${day}`.length === 1 ? `0${day}` : `${day}`)
    }
  }

  return YYYYMMDD
}

export const getEndDateSuggestion = ({ day, month, year }) => {
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

export const getStartDateSuggestion = ({ day, month, year }) => {
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

export const getDateSuggestion = ({
  day,
  isEndDate,
  isStartDate,
  month,
  year,
}) => {
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

export const getTimestamp = ({ day, isEndDate, isStartDate, month, year }) => {
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

  const interpretedTimestamp = isEndDate
    ? moment(YYYYMMDD).endOf('date')
    : moment(YYYYMMDD)

  return interpretedTimestamp.isValid()
    ? interpretedTimestamp.toISOString(true)
    : undefined
}

export const getRangeValue = ({
  currentRangeValue,
  dateType,
  updatedDatePartName,
  updatedDatePartValue,
}) => {
  if (dateType === BEFORE && updatedDatePartName === 'endDate') {
    return {
      dateType,
      endDate: updatedDatePartValue,
      startDate: {
        interpretedTimestamp: getEarliestTimestamp(),
      },
    }
  }

  if (dateType === SINGLE && updatedDatePartName === 'startDate') {
    return {
      dateType,
      endDate: {
        ...(updatedDatePartValue || {}),
        interpretedTimestamp: getTimestamp({
          ...(updatedDatePartValue || {}),
          isEndDate: true,
        }),
      },
      startDate: updatedDatePartValue,
    }
  }

  return {
    ...currentRangeValue,
    dateType,
    [updatedDatePartName]: updatedDatePartValue,
  }
}

export const getRangeValueAfterDateTypeChange = ({
  currentRangeValue,
  nextDateType,
  previousDateType,
}) => {
  const updatedValue = { ...currentRangeValue, dateType: nextDateType }

  if (previousDateType === BEFORE && nextDateType === RANGE) {
    // keep end date, but clear start date
    updatedValue.startDate = {}
  } else if (previousDateType === BEFORE && nextDateType === SINGLE) {
    updatedValue.startDate = {}
    updatedValue.endDate = {}
  } else if (previousDateType === RANGE && nextDateType === BEFORE) {
    if (
      currentRangeValue.endDate &&
      currentRangeValue.endDate.interpretedTimestamp
    ) {
      updatedValue.startDate = {
        interpretedTimestamp: getEarliestTimestamp(),
      }
    } else {
      updatedValue.endDate = {}
      updatedValue.startDate = {}
    }
  } else if (previousDateType === RANGE && nextDateType === SINGLE) {
    if (
      currentRangeValue.startDate &&
      currentRangeValue.startDate.interpretedTimestamp
    ) {
      updatedValue.endDate = {
        ...updatedValue.startDate,
        interpretedTimestamp: getTimestamp({
          ...updatedValue.startDate,
          isEndDate: true,
        }),
      }
    } else {
      updatedValue.endDate = {}
      updatedValue.startDate = {}
    }
  } else if (previousDateType === SINGLE && nextDateType === BEFORE) {
    updatedValue.endDate = {}
    updatedValue.startDate = {}
  } else if (previousDateType === SINGLE && nextDateType === RANGE) {
    // noop
  }

  return updatedValue
}
