import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'

import { getTimestampFromYMD } from 'common/es5/date'
import createDeleteProperties from 'common/es5/createDeleteProperties'
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
  setYearInputRef: PropTypes.func,
}
const defaultProps = {
  disabled: false,
  displayLabel: true,
  hidden: false,
  isEndDate: false,
  isStartDate: false,
  setYearInputRef: undefined,
}

class SingleDate extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
  }

  handleOnBlur() {
    const { onBlur } = this.props.input

    if (!onBlur) {
      return null
    }

    return onBlur(this.props.input.value)
  }

  handleOnChange({ event, field }) {
    const { input: { onChange, value }, isEndDate, isStartDate } = this.props

    if (!onChange) {
      return null
    }

    const updatedDatePartValues = {
      ...(value || {}),
      // overwrite one of day, month, year with the new value
      [field]: event.target.value && Number(event.target.value),
    }

    const interpretedTimestamp = getTimestampFromYMD({
      isEndDate,
      isStartDate,
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
      hidden,
      input: { value },
      setYearInputRef,
    } = this.props
    const { day, month, year } = value || {}

    return (
      <FieldTemplate
        displayLabel={false}
        enableHelpNotifications={false}
        float="left"
        meta={{}}
        style={{ display: hidden ? 'none' : undefined, width: 'initial' }}
      >
        <div style={inputYearStyle}>
          <FieldTemplate
            displayLabel={displayLabel}
            enableHelpNotifications={false}
            float="left"
            label="Year"
            meta={{}}
            subLabel
          >
            <Input
              className="arrowless right-aligned"
              disabled={disabled}
              fluid
              onBlur={event => {
                this.handleOnBlur({ event, field: 'year' })
              }}
              onChange={event => {
                this.handleOnChange({ event, field: 'year' })
              }}
              onFocus={event => {
                this.handleOnFocus({ event, field: 'year' })
              }}
              ref={setYearInputRef}
              type="number"
              value={year || ''}
            />
          </FieldTemplate>
        </div>
        <div style={inputMonthStyle}>
          <FieldTemplate
            displayLabel={displayLabel}
            enableHelpNotifications={false}
            float="left"
            label="Month"
            meta={{}}
            subLabel
          >
            <Input
              className="arrowless right-aligned"
              disabled={disabled}
              fluid
              max={12}
              min={1}
              onBlur={event => {
                this.handleOnBlur({ event, field: 'month' })
              }}
              onChange={event => {
                this.handleOnChange({ event, field: 'month' })
              }}
              onFocus={event => {
                this.handleOnFocus({ event, field: 'month' })
              }}
              type="number"
              value={month || ''}
            />
          </FieldTemplate>
        </div>
        <div style={inputDayStyle}>
          <FieldTemplate
            displayLabel={displayLabel}
            enableHelpNotifications={false}
            float="left"
            label="Day"
            meta={{}}
            subLabel
          >
            <Input
              className="arrowless right-aligned"
              disabled={disabled}
              fluid
              max={31}
              min={1}
              onBlur={event => {
                this.handleOnBlur({ event, field: 'day' })
              }}
              onChange={event => {
                this.handleOnChange({ event, field: 'day' })
              }}
              onFocus={event => {
                this.handleOnFocus({ event, field: 'day' })
              }}
              type="number"
              value={day || ''}
            />
          </FieldTemplate>
        </div>
      </FieldTemplate>
    )
  }
}

SingleDate.propTypes = propTypes
SingleDate.defaultProps = defaultProps

export default SingleDate
