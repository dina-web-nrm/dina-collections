import React from 'react'
import PropTypes from 'prop-types'
import FieldWrapper from '../../../../FieldWrapper'
import SingleDateComponent from './Component'
import {
  futureSingleDate,
  pastSingleDate,
  textParsable,
} from '../../validationFunctions'

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

function SingleDateField(props) {
  const { future, past, validate: validateInput, validateText } = props

  let validate = [...validateInput]
  if (future) {
    validate = [...validate, futureSingleDate]
  }

  if (past) {
    validate = [...validate, pastSingleDate]
  }

  if (validateText) {
    validate = [...validate, textParsable]
  }

  return (
    <FieldWrapper {...props} component={SingleDateComponent} warn={validate} />
  )
}

SingleDateField.propTypes = propTypes
SingleDateField.defaultProps = defaultProps

export default SingleDateField
