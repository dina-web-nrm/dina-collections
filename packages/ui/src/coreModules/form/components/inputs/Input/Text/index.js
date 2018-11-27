import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

import config from 'config'

const propTypes = {
  autoComplete: PropTypes.string,
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
  focusOnMount: PropTypes.bool,
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  max: PropTypes.number,
  min: PropTypes.number,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
}
const defaultProps = {
  autoComplete: undefined,
  disabled: false,
  fluid: false,
  focusOnMount: false,
  icon: undefined,
  iconPosition: 'left',
  max: undefined,
  min: undefined,
  placeholder: undefined,
  size: undefined,
  style: undefined,
  type: 'text',
}

class TextInput extends PureComponent {
  componentDidMount() {
    if (this.props.focusOnMount && !config.isTest) {
      this.input.focus()
    }
  }

  render() {
    const {
      autoComplete,
      disabled,
      fluid,
      icon,
      iconPosition,
      input,
      max,
      min,
      placeholder,
      size,
      style,
      type,
    } = this.props

    return (
      <Input
        autoComplete={autoComplete}
        disabled={disabled}
        fluid={fluid}
        icon={icon}
        iconPosition={icon && iconPosition}
        max={max}
        min={min}
        placeholder={placeholder}
        ref={element => {
          this.input = element
        }}
        type={type}
        {...input}
        size={size}
        style={style}
      />
    )
  }
}

TextInput.propTypes = propTypes
TextInput.defaultProps = defaultProps

export default TextInput
