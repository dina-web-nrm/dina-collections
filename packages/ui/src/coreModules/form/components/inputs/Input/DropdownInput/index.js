import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Dropdown, Input } from 'semantic-ui-react'

import config from 'config'

const propTypes = {
  autoComplete: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  fluid: PropTypes.bool,
  focusOnMount: PropTypes.bool,
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  input: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  labelPosition: PropTypes.string.isRequired,
  onOptionChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  placeholder: PropTypes.string,
  size: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.string,
}
const defaultProps = {
  autoComplete: undefined,
  defaultValue: undefined,
  disabled: false,
  fluid: false,
  focusOnMount: false,
  icon: undefined,
  iconPosition: 'left',
  placeholder: undefined,
  size: undefined,
  style: undefined,
  type: 'text',
}

class DropdownInput extends PureComponent {
  componentDidMount() {
    if (this.props.focusOnMount && !config.isTest) {
      this.input.focus()
    }
  }

  render() {
    const {
      autoComplete,
      defaultValue,
      disabled,
      fluid,
      icon,
      iconPosition,
      input,
      labelPosition,
      onOptionChange: handleChange,
      options,
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
        label={
          <Dropdown
            defaultValue={defaultValue}
            onChange={handleChange}
            options={options}
          />
        }
        labelPosition={labelPosition}
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

DropdownInput.propTypes = propTypes
DropdownInput.defaultProps = defaultProps

export default DropdownInput
