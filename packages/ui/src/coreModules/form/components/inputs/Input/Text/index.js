import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

const propTypes = {
  autoComplete: PropTypes.string,
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  placeholder: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
}
const defaultProps = {
  autoComplete: undefined,
  icon: undefined,
  iconPosition: 'left',
  placeholder: undefined,
  size: undefined,
  style: undefined,
  type: 'text',
}

const TextInput = ({
  autoComplete,
  icon,
  iconPosition,
  input,
  placeholder,
  type,
  size,
  style,
}) => {
  return (
    <Input
      autoComplete={autoComplete}
      icon={icon}
      iconPosition={icon && iconPosition}
      placeholder={placeholder}
      type={type}
      {...input}
      size={size}
      style={style}
    />
  )
}

TextInput.propTypes = propTypes
TextInput.defaultProps = defaultProps

export default TextInput
