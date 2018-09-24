import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'
import FieldTemplate from '../../../../FieldTemplate'
import {
  createExactDateUpdatedValue,
  extractExactDateFieldValue,
  getFieldMeta,
} from '../utilities'

const propTypes = {
  displaySubLabel: PropTypes.bool,
  input: PropTypes.object.isRequired,
}

const defaultProps = {
  displaySubLabel: false,
}

class ExactDate extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
    this.getFieldValue = this.getFieldValue.bind(this)
  }

  getFieldValue(field) {
    const { input } = this.props
    return extractExactDateFieldValue({
      field,
      value: input.value,
    })
  }

  handleOnBlur() {
    const { onBlur } = this.props.input
    if (!onBlur) {
      return null
    }

    return onBlur(this.props.input.value)
  }

  handleOnChange({ event, field }) {
    const { onChange } = this.props.input
    if (!onChange) {
      return null
    }

    const updatedValue = createExactDateUpdatedValue({
      currentValue: this.props.input.value,
      field,
      newValue: event.target.value,
    })
    if (updatedValue) {
      return onChange(updatedValue)
    }
    return null
  }

  handleOnFocus() {
    const { onFocus } = this.props.input
    if (!onFocus) {
      return null
    }

    return onFocus(this.props.input.value)
  }

  render() {
    const { displaySubLabel } = this.props

    const inputYearStyle = {
      float: 'left',
      paddingRight: 1,
      width: '40%',
    }

    const inputMonthStyle = {
      float: 'left',
      paddingLeft: 1,
      paddingRight: 1,
      width: '30%',
    }

    const inputDayStyle = {
      float: 'left',
      paddingLeft: 1,
      width: '30%',
    }

    return (
      <FieldTemplate
        displayLabel={!!displaySubLabel}
        enableHelpNotifications={false}
        float="left"
        label="Exact"
        meta={{}}
        parameterKey=""
        subLabel
      >
        <div style={{ maxWidth: 200, width: '100%' }}>
          <div style={inputYearStyle}>
            <FieldTemplate
              displayLabel={false}
              enableHelpNotifications={false}
              float="left"
              meta={getFieldMeta({ field: 'year', props: this.props })}
              parameterKey=""
            >
              <Input
                onBlur={event => {
                  this.handleOnBlur({ event, field: 'year' })
                }}
                onChange={event => {
                  this.handleOnChange({ event, field: 'year' })
                }}
                onFocus={event => {
                  this.handleOnFocus({ event, field: 'year' })
                }}
                placeholder="yyyy"
                type="text"
                value={this.getFieldValue('year')}
              />
            </FieldTemplate>
          </div>

          <div style={inputMonthStyle}>
            <FieldTemplate
              displayLabel={false}
              enableHelpNotifications={false}
              float="left"
              meta={getFieldMeta({ field: 'month', props: this.props })}
              parameterKey=""
            >
              <Input
                onBlur={event => {
                  this.handleOnBlur({ event, field: 'month' })
                }}
                onChange={event => {
                  this.handleOnChange({ event, field: 'month' })
                }}
                onFocus={event => {
                  this.handleOnFocus({ event, field: 'month' })
                }}
                placeholder="mm"
                type="text"
                value={this.getFieldValue('month')}
              />
            </FieldTemplate>
          </div>

          <div style={inputDayStyle}>
            <FieldTemplate
              displayLabel={false}
              enableHelpNotifications={false}
              float="left"
              meta={getFieldMeta({ field: 'day', props: this.props })}
              parameterKey=""
            >
              <Input
                onBlur={event => {
                  this.handleOnBlur({ event, field: 'day' })
                }}
                onChange={event => {
                  this.handleOnChange({ event, field: 'day' })
                }}
                onFocus={event => {
                  this.handleOnFocus({ event, field: 'day' })
                }}
                placeholder="dd"
                type="text"
                value={this.getFieldValue('day')}
              />
            </FieldTemplate>
          </div>
        </div>
      </FieldTemplate>
    )
  }
}

ExactDate.propTypes = propTypes
ExactDate.defaultProps = defaultProps

export default ExactDate
