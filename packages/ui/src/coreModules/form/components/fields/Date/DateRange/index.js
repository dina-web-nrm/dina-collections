import React from 'react'
import PropTypes from 'prop-types'
import FieldWrapper from '../../../FieldWrapper'
import DateRangeComponent from './Component'
import {
  bothStartAndEndDateRequiredIfOneProvided,
  dateRangeStartDateNotAfterEndDate,
  futureDateRange,
  pastDateRange,
  intervalParsable,
  isYYYYMMDD,
} from '../validationFunctions'

const propTypes = {
  future: PropTypes.bool,
  past: PropTypes.bool,
  requireYYYYMMDD: PropTypes.bool,
  validate: PropTypes.array,
  validateText: PropTypes.bool,
}

const defaultProps = {
  future: false,
  past: false,
  requireYYYYMMDD: false,
  validate: [],
  validateText: true,
}

function DateRangeField(props) {
  const {
    future,
    past,
    requireYYYYMMDD,
    validate: validateErrorsInput,
    validateText,
  } = props

  const validateErrors = [...validateErrorsInput]

  if (requireYYYYMMDD) {
    validateErrors.push(isYYYYMMDD)
  }

  if (future) {
    validateErrors.push(futureDateRange)
  }

  if (past) {
    validateErrors.push(pastDateRange)
  }

  if (validateText) {
    validateErrors.push(intervalParsable)
  }

  validateErrors.push(bothStartAndEndDateRequiredIfOneProvided)
  validateErrors.push(dateRangeStartDateNotAfterEndDate)

  return (
    <FieldWrapper
      {...props}
      component={DateRangeComponent}
      validate={validateErrors}
    />
  )
}

DateRangeField.propTypes = propTypes
DateRangeField.defaultProps = defaultProps

export default DateRangeField
