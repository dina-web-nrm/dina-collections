import React from 'react'
import PropTypes from 'prop-types'
import { FormFieldError } from '../../../error/components'
import injectErrorKeys from '../../higherOrderComponents/injectErrorKeys'

const propTypes = {
  error: PropTypes.object.isRequired,
  errorKeys: PropTypes.array.isRequired,
}

const FieldError = ({ error, errorKeys }) => {
  return <FormFieldError error={error} errorKeys={errorKeys} />
}

FieldError.propTypes = propTypes

export default injectErrorKeys(FieldError)
