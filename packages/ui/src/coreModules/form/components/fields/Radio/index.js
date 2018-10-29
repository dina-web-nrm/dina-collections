import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Radio } from 'semantic-ui-react'

import FieldTemplate from '../../FieldTemplate'

const propTypes = {
  enableHelpNotifications: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  label: PropTypes.node,
  labelKey: PropTypes.string,
  radioOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

const defaultProps = {
  enableHelpNotifications: undefined,
  label: undefined,
  labelKey: undefined,
}

class RadioField extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, { value }) {
    this.props.input.onChange(value)
  }

  render() {
    const {
      enableHelpNotifications,
      input: { name, value: selectedValue },
      label,
      labelKey,
      radioOptions,
    } = this.props

    return (
      <FieldTemplate
        enableHelpNotifications={enableHelpNotifications}
        label={label}
        labelKey={labelKey}
        meta={{}}
        name={name}
        style={{ marginBottom: '0.5em', width: '100%' }}
      >
        {radioOptions.map(type => {
          const { key, text, value } = type

          return (
            <Radio
              checked={selectedValue === value}
              className="inline group"
              key={key}
              label={text}
              name={name}
              onChange={this.handleChange}
              value={value}
            />
          )
        })}
      </FieldTemplate>
    )
  }
}

RadioField.propTypes = propTypes
RadioField.defaultProps = defaultProps

export default RadioField
