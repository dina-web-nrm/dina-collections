const moment = require('moment')
const objectPath = require('object-path')

const createValidationIfDateTypeRange = func => {
  return value => {
    if (value && value.dateType === 'range') {
      return func(value)
    }

    return true
  }
}

const validIfNotEmpty = datePartValue => {
  if (!datePartValue) {
    return true
  }

  const { day, interpretedTimestamp, month, year } = datePartValue

  if ((day || month || year) && !interpretedTimestamp) {
    return false
  }

  return true
}

const validIfNotEmptyRange = rangeValue => {
  if (!rangeValue) {
    return true
  }

  const { endDate, startDate } = rangeValue

  return validIfNotEmpty(endDate) && validIfNotEmpty(startDate)
}

const noOrphanDay = datePartValue => {
  if (!datePartValue) {
    return true
  }

  const { day, month, year } = datePartValue

  if (day && (!month || !year)) {
    return false
  }

  return true
}

const noOrphanDayRange = value => {
  return (
    noOrphanDay(value && value.startDate) && noOrphanDay(value && value.endDate)
  )
}

const noOrphanMonth = datePartValue => {
  if (!datePartValue) {
    return true
  }

  const { month, year } = datePartValue

  if (month && !year) {
    return false
  }

  return true
}

const noOrphanMonthRange = value => {
  return (
    noOrphanMonth(value && value.startDate) &&
    noOrphanMonth(value && value.endDate)
  )
}

const pastSingleDate = value => {
  if (!(value && value.interpretedTimestamp)) {
    return true
  }

  const parsedInterpretedTimestamp = moment(value.interpretedTimestamp)

  if (moment(parsedInterpretedTimestamp).isAfter(moment.utc())) {
    return false
  }

  return true
}

const pastDateRange = value => {
  return (
    pastSingleDate(value && value.startDate) &&
    pastSingleDate(value && value.endDate)
  )
}

const dateRangeStartDateNotAfterEndDate = value => {
  const startDateTimestamp = objectPath.get(
    value,
    'startDate.interpretedTimestamp'
  )
  const endDateTimestamp = objectPath.get(value, 'endDate.interpretedTimestamp')

  if (!(startDateTimestamp && endDateTimestamp)) {
    return true
  }

  return !moment(startDateTimestamp).isAfter(endDateTimestamp)
}

const bothStartAndEndDateRequiredIfOneProvided = value => {
  if (
    !value ||
    (!value.startDate && !value.endDate) ||
    (!objectPath.get(value, 'startDate.interpretedTimestamp') &&
      !objectPath.get(value, 'endDate.interpretedTimestamp'))
  ) {
    return true
  }

  if (
    objectPath.get(value, 'startDate.interpretedTimestamp') &&
    objectPath.get(value, 'endDate.interpretedTimestamp')
  ) {
    return true
  }

  return false
}

const textParsable = value => {
  if (value && value.dateText && !value.interpretedTimestamp) {
    return false
  }

  return true
}

const intervalParsable = value => {
  return (
    textParsable(value && value.startDate) &&
    textParsable(value && value.endDate)
  )
}

const isYYYYMMDD = value => {
  if (
    value &&
    value.startDate &&
    value.startDate.dateText &&
    !value.startDate.dateText.match(/(\d{4})-(\d{2})-(\d{2})/)
  ) {
    return false
  }

  if (
    value &&
    value.endDate &&
    value.endDate.dateText &&
    !value.endDate.dateText.match(/(\d{4})-(\d{2})-(\d{2})/)
  ) {
    return false
  }

  return true
}

exports.createValidationIfDateTypeRange = createValidationIfDateTypeRange
exports.validIfNotEmpty = validIfNotEmpty
exports.validIfNotEmptyRange = validIfNotEmptyRange
exports.noOrphanDay = noOrphanDay
exports.noOrphanDayRange = noOrphanDayRange
exports.noOrphanMonth = noOrphanMonth
exports.noOrphanMonthRange = noOrphanMonthRange
exports.pastDateRange = pastDateRange
exports.dateRangeStartDateNotAfterEndDate = dateRangeStartDateNotAfterEndDate
exports.bothStartAndEndDateRequiredIfOneProvided = bothStartAndEndDateRequiredIfOneProvided
exports.textParsable = textParsable
exports.intervalParsable = intervalParsable
exports.isYYYYMMDD = isYYYYMMDD
