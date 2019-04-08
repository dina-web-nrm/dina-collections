import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

import config from 'config'

const numberRegex = /^-?\d*\.?\d*$/

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
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.preventNonNumeric = this.preventNonNumeric.bind(this)
  }

  componentDidMount() {
    if (this.props.focusOnMount && !config.isTest) {
      this.input.focus()
    }
  }

  handleOnChange(event) {
    const { input, max, min, type } = this.props

    if (type !== 'number') {
      return input.onChange(event)
    }

    const { value } = event.target

    if (value === '') {
      return input.onChange(event)
    }

    if (!value.match(numberRegex)) {
      return null
    }

    const numberValue = value && Number(value)

    if (min !== undefined && numberValue < min) {
      return null
    }

    if (max !== undefined && numberValue > max) {
      return null
    }

    return input.onChange(event)
  }

  preventNonNumeric(event) {
    const stringValue = String(this.props.input.value) || ''

    if (
      !String(event.key).match(numberRegex) ||
      (event.key === '-' && stringValue.includes('-')) ||
      (event.key === '.' && stringValue.includes('.'))
    ) {
      event.preventDefault()
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
        onChange={this.handleOnChange}
        onKeyPress={
          this.props.type === 'number' ? this.preventNonNumeric : undefined
        }
        size={size}
        style={style}
      />
    )
  }
}

TextInput.propTypes = propTypes
TextInput.defaultProps = defaultProps

export default TextInput
