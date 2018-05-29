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

export const dateRangeStartDateBeforeEndDate = value => {
  const startDateTimestamp =
    value && value.startDate && value.startDate.interpretedTimestamp
  const endDateTimestamp =
    value && value.endDate && value.endDate.interpretedTimestamp

  if (!(startDateTimestamp && endDateTimestamp)) {
    return undefined
  }

  return moment(startDateTimestamp).isBefore(endDateTimestamp)
    ? undefined
    : {
        errorCode: 'DATE_RANGE_START_DATE_BEFORE_END_DATE',
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
