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
} from '../validationFunctions'

const propTypes = {
  future: PropTypes.bool,
  past: PropTypes.bool,
  validate: PropTypes.array,
  validateText: PropTypes.bool,
}

const defaultProps = {
  future: false,
  past: false,
  validate: [],
  validateText: true,
}

function DateRangeField(props) {
  const { future, past, validate: validateInput, validateText } = props

  let validate = [
    ...validateInput,
    bothStartAndEndDateRequiredIfOneProvided,
    dateRangeStartDateNotAfterEndDate,
  ]

  if (future) {
    validate = [...validate, futureDateRange]
  }

  if (past) {
    validate = [...validate, pastDateRange]
  }

  if (validateText) {
    validate = [...validate, intervalParsable]
  }

  return (
    <FieldWrapper {...props} component={DateRangeComponent} warn={validate} />
  )
}

DateRangeField.propTypes = propTypes
DateRangeField.defaultProps = defaultProps

export default DateRangeField
