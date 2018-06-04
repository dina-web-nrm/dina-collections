import moment from 'moment'

export const dateRangeShouldDisplayText = ({ displayText }) => {
  return displayText
}

export const singleDateShouldUseSplitView = ({ displayExact, displayText }) => {
  return displayText && displayExact
}

export const singleDateShouldDisplayExact = ({ displayExact }) => {
  return displayExact
}

export const getFieldMeta = ({ props, field }) => {
  const { meta } = props
  if (!meta) {
    return undefined
  }
  const fieldError = meta && meta.error && meta.error[field]

  const fieldWarning = meta && meta.warning && meta.warning[field]

  return {
    ...meta,
    error: fieldError || undefined,
    warning: fieldWarning || undefined,
  }
}

export const isInt = value => {
  return (
    !Number.isNaN(value) &&
    Number.parseInt(Number(value), 10) == value && // eslint-disable-line eqeqeq
    !Number.isNaN(parseInt(value, 10))
  )
}

export const extractExactDateFieldValue = ({ value, field }) => {
  const formattedValue = (value && value[field]) || ''
  return `${formattedValue}`
}

export const extractExactFieldValue = ({ value = {} }) => {
  const {
    day,
    interpretedTime: interpretedTimeString,
    month,
    timestamp: timestampString,
    year,
  } = value
  if (year || month || day) {
    return {
      day,
      month,
      year,
    }
  }

  if (timestampString) {
    const timestamp = moment(timestampString)
    if (timestamp.isValid()) {
      return {
        day: timestamp.date() || undefined,
        month: timestamp.month() ? timestamp.month() + 1 : undefined,
        year: timestamp.year() || undefined,
      }
    }
  }

  if (interpretedTimeString) {
    const timestamp = moment(interpretedTimeString)
    if (timestamp.isValid()) {
      return {
        day: timestamp.date() || undefined,
        month: timestamp.month() ? timestamp.month() + 1 : undefined,
        year: timestamp.year() || undefined,
      }
    }
  }

  return {
    day,
    month,
    year,
  }
}

export const createExactDateUpdatedValue = ({
  currentValue,
  newValue,
  field,
}) => {
  if (!newValue) {
    const updatedValue = {
      ...currentValue,
      [field]: undefined,
    }
    delete updatedValue[field]
    return updatedValue
  }

  if (!isInt(newValue)) {
    return undefined
  }

  return {
    ...(currentValue || {}),
    [field]: Number(newValue),
  }
}

export const createInterpretedTimestamp = ({ day, month, year }) => {
  if (!(year && `${year}`.length === 4)) {
    return undefined
  }

  const timestamp = moment.utc({
    day,
    month: month !== undefined ? month - 1 : undefined,
    year,
  })

  if (timestamp.isValid()) {
    return timestamp.format()
  }
  return undefined
}

export const createSingleDateUpdatedValue = ({
  currentValue,
  field,
  value,
}) => {
  let updatedValue = {
    ...currentValue,
  }

  if (field === 'todayButton') {
    const timestamp = moment().utc()
    updatedValue = {
      ...updatedValue,
      dateText: '',
      day: timestamp.date() || undefined,
      month:
        timestamp.month() !== undefined ? timestamp.month() + 1 : undefined,
      year: timestamp.year() || undefined,
    }
  } else if (field === 'textDate') {
    updatedValue = {
      ...updatedValue,
      dateText: value || '',
    }
    if (value) {
      const timestamp = moment(value)
      if (timestamp.isValid()) {
        updatedValue = {
          ...updatedValue,
          day: timestamp.date() || undefined,
          month:
            timestamp.month() !== undefined ? timestamp.month() + 1 : undefined,
          year: timestamp.year() || undefined,
        }
      }
    }
  } else if (field === 'flexibleDate') {
    updatedValue = {
      dateText: value || '',
    }
    if (value) {
      const timestamp = moment(value)
      if (timestamp.isValid()) {
        updatedValue = {
          ...updatedValue,
          day: timestamp.date() || undefined,
          month:
            timestamp.month() !== undefined ? timestamp.month() + 1 : undefined,
          year: timestamp.year() || undefined,
        }
      }
    }
  } else {
    updatedValue = {
      ...updatedValue,
      year: value.year || undefined,
    }

    updatedValue = {
      ...updatedValue,
      month: value.month || undefined,
    }

    updatedValue = {
      ...updatedValue,
      day: value.day || undefined,
    }
  }

  const interpretedTimestamp = createInterpretedTimestamp(updatedValue)

  if (interpretedTimestamp) {
    updatedValue = {
      ...updatedValue,
      interpretedTimestamp,
    }
  } else {
    delete updatedValue.interpretedTimestamp
  }

  return updatedValue
}

export const createDateTextValueFromInput = ({ input, useDateText = true }) => {
  const { value: { year, month, day, dateText } = {} } = input

  if (dateText && useDateText) {
    return dateText
  }

  if (!year) {
    return undefined
  }

  const paddedMonth = month && `${month}`.length === 1 ? `0${month}` : month
  const paddedDay = day && `${day}`.length === 1 ? `0${day}` : day

  return `${year}-${paddedMonth}-${paddedDay}`
}
