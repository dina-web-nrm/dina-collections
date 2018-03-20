import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

const propTypes = {
  autoComplete: PropTypes.string,
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  placeholder: PropTypes.string,
  type: PropTypes.string,
}
const defaultProps = {
  autoComplete: undefined,
  icon: undefined,
  iconPosition: 'left',
  placeholder: undefined,
  type: 'text',
}

const TextInput = ({
  autoComplete,
  icon,
  iconPosition,
  input,
  placeholder,
  type,
}) => {
  return (
    <Input
      autoComplete={autoComplete}
      icon={icon}
      iconPosition={icon && iconPosition}
      placeholder={placeholder}
      type={type}
      {...input}
    />
  )
}

TextInput.propTypes = propTypes
TextInput.defaultProps = defaultProps

export default TextInput
