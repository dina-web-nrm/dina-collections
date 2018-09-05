import moment from 'moment'

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

export const pastSingleDate = value => {
  if (!(value && value.interpretedTimestamp)) {
    return undefined
  }

  const parsedInterpretedTimestamp = moment(value.interpretedTimestamp)
  return moment(parsedInterpretedTimestamp).isBefore(moment.utc())
    ? undefined
    : {
        errorCode: 'DATE_PAST',
      }
}

export const pastDateRange = value => {
  return (
    pastSingleDate(value && value.startDate) ||
    pastSingleDate(value && value.endDate)
  )
}

export const futureDateRange = value => {
  return (
    futureSingleDate(value && value.startDate) ||
    futureSingleDate(value && value.endDate)
  )
}

export const dateRangeStartDateNotAfterEndDate = value => {
  const startDateTimestamp =
    value && value.startDate && value.startDate.interpretedTimestamp
  const endDateTimestamp =
    value && value.endDate && value.endDate.interpretedTimestamp

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
  if (!value || (!value.startDate && !value.endDate)) {
    return undefined
  }

  if (
    value &&
    value.startDate &&
    (value.startDate.dateText ||
      (value.startDate.day && value.startDate.month && value.startDate.year)) &&
    value.endDate &&
    (value.endDate.dateText ||
      (value.endDate.day && value.endDate.month && value.endDate.year))
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
