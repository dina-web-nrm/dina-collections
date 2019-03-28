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

function preventNonNumeric(event) {
  if (event.key === 'e' || event.key === 'E') {
    event.preventDefault()
  }
}

class TextInput extends PureComponent {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
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

    if (min === undefined && max === undefined) {
      return input.onChange(event)
    }
    const { value } = event.target
    const numberValue = value !== '' ? Number(value) : undefined

    if (numberValue === undefined) {
      return input.onChange(event)
    }

    if (min !== undefined && numberValue < min) {
      return null
    }

    if (max !== undefined && numberValue > max) {
      return null
    }
    return input.onChange(event)
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
          this.props.type === 'number' ? preventNonNumeric : undefined
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
