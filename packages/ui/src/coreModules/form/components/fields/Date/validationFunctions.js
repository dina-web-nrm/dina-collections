import moment from 'moment'
import objectPath from 'object-path'

export const validIfNotEmpty = datePartValue => {
  if (!datePartValue) {
    return undefined
  }

  const { day, interpretedTimestamp, month, year } = datePartValue

  if ((day || month || year) && !interpretedTimestamp) {
    return {
      errorCode: 'DATE_CANNOT_BE_INTERPRETED',
    }
  }

  return undefined
}

export const validIfNotEmptyRange = rangeValue => {
  if (!rangeValue) {
    return undefined
  }

  const { endDate, startDate } = rangeValue

  return (
    (endDate && validIfNotEmpty(endDate)) ||
    (startDate && validIfNotEmpty(startDate))
  )
}

export const noOrphanDayOrMonth = datePartValue => {
  if (!datePartValue) {
    return undefined
  }

  const { day, month, year } = datePartValue

  if (month && !year) {
    return {
      errorCode: 'DATE_ORPHAN_MONTH',
    }
  }

  if (day && (!month || !year)) {
    return {
      errorCode: 'DATE_ORPHAN_DAY',
    }
  }

  return undefined
}

export const noOrphanDayOrMonthInRange = rangeValue => {
  if (!rangeValue) {
    return undefined
  }

  const { endDate, startDate } = rangeValue

  return (
    (endDate && noOrphanDayOrMonth(endDate)) ||
    (startDate && noOrphanDayOrMonth(startDate))
  )
}

export const futureSingleDate = value => {
  if (!(value && value.interpretedTimestamp)) {
    return undefined
  }

  const parsedInterpretedTimestamp = moment(value.interpretedTimestamp)
  return moment(parsedInterpretedTimestamp).isAfter(moment.utc())
    ? undefined
    : {
        errorCode: 'DATE_FUTURE',
      }
}

export const pastSingleDate = (value, isEndDate) => {
  if (!(value && value.interpretedTimestamp)) {
    return undefined
  }

  const parsedInterpretedTimestamp = moment(value.interpretedTimestamp)

  const dateYear = parsedInterpretedTimestamp.year()
  const currentYear = moment().year()
  const isCurrentYear = dateYear === currentYear

  // today's date is allowed
  return moment(parsedInterpretedTimestamp).isAfter(moment.utc())
    ? {
        errorCode:
          isEndDate && isCurrentYear ? 'DATE_PAST_CURRENT_YEAR' : 'DATE_PAST',
      }
    : undefined
}

export const pastDateRange = value => {
  return (
    pastSingleDate(value && value.startDate) ||
    pastSingleDate(value && value.endDate, true)
  )
}

export const futureDateRange = value => {
  return (
    futureSingleDate(value && value.startDate) ||
    futureSingleDate(value && value.endDate)
  )
}

export const dateRangeStartDateNotAfterEndDate = value => {
  const startDateTimestamp = objectPath.get(
    value,
    'startDate.interpretedTimestamp'
  )
  const endDateTimestamp = objectPath.get(value, 'endDate.interpretedTimestamp')

  if (!(startDateTimestamp && endDateTimestamp)) {
    return undefined
  }

  return moment(startDateTimestamp).isAfter(endDateTimestamp)
    ? {
        errorCode: 'DATE_RANGE_START_DATE_NOT_AFTER_END_DATE',
      }
    : undefined
}

export const bothStartAndEndDateRequiredIfOneProvided = value => {
  if (
    !value ||
    (!value.startDate && !value.endDate) ||
    (!objectPath.get(value, 'startDate.interpretedTimestamp') &&
      !objectPath.get(value, 'endDate.interpretedTimestamp'))
  ) {
    return undefined
  }

  if (
    objectPath.get(value, 'startDate.interpretedTimestamp') &&
    objectPath.get(value, 'endDate.interpretedTimestamp')
  ) {
    return undefined
  }

  return {
    errorCode: 'DATE_RANGE_BOTH_START_AND_END_REQUIRED',
  }
}

export const textParsable = value => {
  if (value && value.dateText && !value.interpretedTimestamp) {
    return {
      errorCode: 'DATE_TEXT_NOT_PARSABLE',
    }
  }
  return undefined
}

export const intervalParsable = value => {
  return (
    (textParsable(value && value.startDate) ||
      textParsable(value && value.endDate)) && {
      errorCode: 'DATE_RANGE_NOT_PARSABLE',
    }
  )
}

export const isYYYYMMDD = value => {
  if (
    value &&
    value.startDate &&
    value.startDate.dateText &&
    !value.startDate.dateText.match(/(\d{4})-(\d{2})-(\d{2})/)
  ) {
    return {
      errorCode: 'DATE_RANGE_START_NOT_YYYY_MM_DD',
    }
  }

  if (
    value &&
    value.endDate &&
    value.endDate.dateText &&
    !value.endDate.dateText.match(/(\d{4})-(\d{2})-(\d{2})/)
  ) {
    return {
      errorCode: 'DATE_RANGE_END_NOT_YYYY_MM_DD',
    }
  }

  return undefined
}
