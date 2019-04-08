import React, { Component } from 'react'
import PropTypes from 'prop-types'
import objectPath from 'object-path'

import { getInterpretedTimestampFromYMD } from 'common/es5/date'
import createDeleteProperties from 'common/es5/createDeleteProperties'
import Input from '../../../inputs/Input/Text'
import FieldTemplate from '../../../FieldTemplate'

const deleteEmptyStringProperties = createDeleteProperties('')
const deleteUndefinedProperties = createDeleteProperties(undefined)

const inputYearStyle = {
  float: 'left',
  paddingRight: '0.2em',
  width: '4.5em',
}

const inputMonthStyle = {
  float: 'left',
  paddingLeft: '0.2em',
  paddingRight: '0.2em',
  width: '3.5em',
}

const inputDayStyle = {
  float: 'left',
  paddingLeft: '0.2em',
  width: '3.5em',
}

const propTypes = {
  disabled: PropTypes.bool,
  displayLabel: PropTypes.bool,
  displaySubLabel: PropTypes.bool,
  enableHelpNotifications: PropTypes.bool,
  hidden: PropTypes.bool,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        day: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        month: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        year: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      }),
    ]),
  }).isRequired,
  isEndDate: PropTypes.bool,
  isStartDate: PropTypes.bool,
  label: PropTypes.node,
  module: PropTypes.string,
  name: PropTypes.string,
  setYearInputRef: PropTypes.func,
}
const defaultProps = {
  disabled: false,
  displayLabel: undefined,
  displaySubLabel: undefined,
  enableHelpNotifications: undefined,
  hidden: false,
  isEndDate: false,
  isStartDate: false,
  label: undefined,
  module: undefined,
  name: undefined,
  setYearInputRef: undefined,
}

class DatePart extends Component {
  constructor(props) {
    super(props)
    this.getInput = this.getInput.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
  }

  getInput(fieldName) {
    return {
      onBlur: event => this.handleOnBlur({ event, fieldName }),
      onChange: event => this.handleOnChange({ event, fieldName }),
      onFocus: event => this.handleOnFocus({ event, fieldName }),
      value: objectPath.get(this.props, `input.value.${fieldName}`) || '',
    }
  }

  handleOnBlur() {
    const { onBlur } = this.props.input

    if (!onBlur) {
      return null
    }

    return onBlur(this.props.input.value)
  }

  handleOnChange({ event, fieldName }) {
    const {
      input: { onChange, value },
      isEndDate,
      isStartDate,
    } = this.props

    if (!onChange) {
      return null
    }

    const updatedDatePartValues = {
      ...(value || {}),
      // overwrite one of day, month, year with the new value
      [fieldName]: event.target.value && Number(event.target.value),
    }

    const interpretedTimestamp = getInterpretedTimestampFromYMD({
      isEndDate,
      isStartDate,
      moveCurrentYearEndDateToNow: true,
      ...updatedDatePartValues,
    })

    return onChange(
      deleteUndefinedProperties(
        deleteEmptyStringProperties({
          ...updatedDatePartValues,
          interpretedTimestamp,
        })
      )
    )
  }

  handleOnFocus() {
    const { onFocus } = this.props.input

    if (!onFocus) {
      return null
    }

    return onFocus(this.props.input.value)
  }

  render() {
    const {
      disabled,
      displayLabel,
      displaySubLabel,
      label,
      enableHelpNotifications,
      hidden,
      isEndDate,
      isStartDate,
      module,
      name,
      setYearInputRef,
    } = this.props

    return (
      <FieldTemplate
        displayLabel={label !== undefined && displayLabel}
        enableHelpNotifications={enableHelpNotifications}
        float="left"
        label={label}
        meta={{}}
        module={module}
        name={name}
        style={{ display: hidden ? 'none' : undefined, width: 'initial' }}
      >
        <div
          data-testid={
            (isEndDate && 'endDatePart') ||
            (isStartDate && 'startDatePart') ||
            'datePart'
          }
        >
          <div style={inputYearStyle}>
            <FieldTemplate
              displayLabel={displaySubLabel}
              enableHelpNotifications={false}
              float="left"
              label="Year"
              meta={{}}
              name="year"
              subLabel
            >
              <Input
                className="arrowless right aligned"
                disabled={disabled}
                fluid
                input={this.getInput('year')}
                ref={setYearInputRef}
                type="number"
              />
            </FieldTemplate>
          </div>
          <div style={inputMonthStyle}>
            <FieldTemplate
              displayLabel={displaySubLabel}
              enableHelpNotifications={false}
              float="left"
              label="Month"
              meta={{}}
              name="month"
              subLabel
            >
              <Input
                className="arrowless right aligned"
                disabled={disabled}
                fluid
                input={this.getInput('month')}
                max={12}
                min={1}
                type="number"
              />
            </FieldTemplate>
          </div>
          <div style={inputDayStyle}>
            <FieldTemplate
              displayLabel={displaySubLabel}
              enableHelpNotifications={false}
              float="left"
              label="Day"
              meta={{}}
              name="day"
              subLabel
            >
              <Input
                className="arrowless right aligned"
                disabled={disabled}
                fluid
                input={this.getInput('day')}
                max={31}
                min={1}
                type="number"
              />
            </FieldTemplate>
          </div>
        </div>
      </FieldTemplate>
    )
  }
}

DatePart.propTypes = propTypes
DatePart.defaultProps = defaultProps

export default DatePart
