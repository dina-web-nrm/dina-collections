import React from 'react'
import PropTypes from 'prop-types'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

const getPaddedDateString = ({ day, month, year }) => {
  const paddedMonth = month && `${month}`.length === 1 ? `0${month}` : month
  const paddedDay = day && `${day}`.length === 1 ? `0${day}` : day

  if (year && month && day) {
    return `${year}-${paddedMonth}-${paddedDay}`
  }

  if (year && month) {
    return `${year}-${paddedMonth}`
  }

  return year
}

const propTypes = {
  dateText: PropTypes.string,
  day: PropTypes.number,
  endDate: PropTypes.string,
  i18n: PropTypes.shape({ moduleTranslate: PropTypes.func.isRequired })
    .isRequired,
  interpretedTimestamp: PropTypes.string,
  month: PropTypes.number,
  startDate: PropTypes.string,
  timestamp: PropTypes.string,
  year: PropTypes.number,
}
const defaultProps = {
  dateText: undefined,
  day: undefined,
  endDate: undefined,
  interpretedTimestamp: undefined,
  month: undefined,
  startDate: undefined,
  timestamp: undefined,
  year: undefined,
}

const DateString = ({
  dateText,
  day,
  endDate,
  i18n: { moduleTranslate },
  interpretedTimestamp,
  month,
  startDate,
  timestamp,
  year,
}) => {
  let dateString
  if (startDate && endDate) {
    dateString = `${moduleTranslate({
      capitalize: true,
      textKey: 'between',
    })} ${startDate} ${moduleTranslate({ textKey: 'and' })} ${endDate}`
  } else if (startDate) {
    dateString = `${moduleTranslate({ capitalize: true, textKey: 'after' })} ${
      startDate
    }`
  } else if (endDate) {
    dateString = `${moduleTranslate({ capitalize: true, textKey: 'before' })} ${
      endDate
    }`
  } else if (year || month || day) {
    dateString = getPaddedDateString({ day, month, year })
  } else if (interpretedTimestamp || timestamp) {
    dateString = interpretedTimestamp || timestamp
  } else {
    dateString = dateText
  }

  return <span>{dateString}</span>
}

DateString.propTypes = propTypes
DateString.defaultProps = defaultProps

export default withI18n({ module: 'commonUi', scope: 'Date' })(DateString)
