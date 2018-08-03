import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

const propTypes = {
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
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
  disabled: false,
  fluid: false,
  icon: undefined,
  iconPosition: 'left',
  placeholder: undefined,
  size: undefined,
  style: undefined,
  type: 'text',
}

const TextInput = ({
  autoComplete,
  disabled,
  fluid,
  icon,
  iconPosition,
  input,
  placeholder,
  size,
  style,
  type,
}) => {
  return (
    <Input
      autoComplete={autoComplete}
      disabled={disabled}
      fluid={fluid}
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
