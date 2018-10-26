import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'semantic-ui-react'

import FieldTemplate from '../../FieldTemplate'

const propTypes = {
  enableHelpNotifications: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  }).isRequired,
  label: PropTypes.object.isRequired,
  radioOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    }).isRequired
  ).isRequired,
}

const defaultProps = {
  enableHelpNotifications: undefined,
}

class RadioBoolean extends Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, { value }) {
    this.props.input.onChange(value === 'true')
  }

  render() {
    const {
      enableHelpNotifications,
      input: { name, value: selectedValue },
      label,
      radioOptions,
    } = this.props

    return (
      <FieldTemplate
        enableHelpNotifications={enableHelpNotifications}
        label={label}
        meta={{}}
        name={name}
      >
        {radioOptions.map(({ key, text, value }) => {
          const checked =
            (value === 'true' && selectedValue === true) ||
            (value === 'false' && selectedValue === false)

          return (
            <Checkbox
              checked={checked}
              className="inline group"
              key={key}
              label={text}
              name={name}
              onChange={this.handleChange}
              radio
              value={value}
            />
          )
        })}
      </FieldTemplate>
    )
  }
}

RadioBoolean.propTypes = propTypes
RadioBoolean.defaultProps = defaultProps

export default RadioBoolean
