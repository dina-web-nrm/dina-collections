import React, { Component } from 'react'
import PropTypes from 'prop-types'
import objectPath from 'object-path'

import config from 'config'
import { BEFORE, RANGE, SINGLE } from 'coreModules/form/constants'
import { emToPixels } from 'coreModules/layout/utilities'
import FieldTemplate from '../../../FieldTemplate'
import {
  bothStartAndEndDateRequiredIfOneProvided,
  dateRangeStartDateNotAfterEndDate,
  noOrphanDayOrMonthInRange,
  pastDateRange,
  validIfNotEmptyRange,
} from '../validationFunctions'
import DatePart from '../DatePart'
import { getRangeValue, getRangeValueAfterDateTypeChange } from '../utilities'
import DateTypeRadios from './DateTypeRadios'

export const defaultValidate = [
  noOrphanDayOrMonthInRange,
  validIfNotEmptyRange,
  bothStartAndEndDateRequiredIfOneProvided,
  dateRangeStartDateNotAfterEndDate,
  pastDateRange,
]

const DATE_TYPES = [SINGLE, RANGE, BEFORE]

const errorStyle = {
  width: emToPixels(26.875),
}

const propTypes = {
  componentErrors: PropTypes.object,
  displayDateTypeRadios: PropTypes.bool,
  displayLabel: PropTypes.bool,
  displaySubLabels: PropTypes.bool,
  initialDateType: PropTypes.oneOf([BEFORE, RANGE, SINGLE]),
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  module: PropTypes.string,
  mountHidden: PropTypes.bool,
}

const defaultProps = {
  componentErrors: {},
  displayDateTypeRadios: false,
  displayLabel: false,
  displaySubLabels: true,
  initialDateType: 'single',
  module: 'form',
  mountHidden: config.isTest,
}

class DateRange extends Component {
  constructor(props) {
    super(props)
    this.getFieldInput = this.getFieldInput.bind(this)
    this.setStartYearInputRef = this.setStartYearInputRef.bind(this)
    this.setEndYearInputRef = this.setEndYearInputRef.bind(this)
    this.handleFocusEndYear = this.handleFocusEndYear.bind(this)
    this.handleFocusStartYear = this.handleFocusStartYear.bind(this)
    this.handleDateTypeChange = this.handleDateTypeChange.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)

    this.state = {
      dateType:
        objectPath.get(props, 'input.value.dateType') || props.initialDateType,
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextDateType = objectPath.get(nextProps, 'input.value.dateType')
    if (nextDateType && this.state.dateType !== nextDateType) {
      this.setState({ dateType: nextDateType })
    }
  }

  getFieldInput(datePartName) {
    const { input } = this.props
    const fieldName = `${input.name}.${datePartName}`

    const updatedInput = {
      name: fieldName,
      onBlur: value => {
        this.handleOnBlur({
          datePartName,
          value,
        })
      },
      onChange: value => {
        this.handleOnChange({
          datePartName,
          value,
        })
      },
      onFocus: value => {
        this.handleOnFocus({
          datePartName,
          value,
        })
      },
      value: input.value[datePartName] || {},
    }
    return updatedInput
  }

  setStartYearInputRef(element) {
    this.startYearInput = element
  }

  setEndYearInputRef(element) {
    this.endYearInput = element
  }

  handleFocusEndYear() {
    // wait for it to be mounted console.log('this.endYearInput', this.endYearInput)
    if (this.endYearInput) {
      this.endYearInput.focus()
    }
  }

  handleFocusStartYear() {
    // wait for it to be mounted console.log('this.startYearInput', this.startYearInput)
    if (this.startYearInput) {
      this.startYearInput.focus()
    }
  }

  handleDateTypeChange(event, { value: nextDateType }) {
    event.preventDefault()
    const { value: currentRangeValue } = this.props.input

    this.setState(({ dateType: previousDateType }) => {
      const updatedValue = getRangeValueAfterDateTypeChange({
        currentRangeValue,
        nextDateType,
        previousDateType,
      })

      this.props.input.onChange(updatedValue)

      // setTimeout needed to allow component to mount first, if necessary
      if (nextDateType === BEFORE) {
        setTimeout(() => this.handleFocusEndYear())
      } else {
        setTimeout(() => this.handleFocusStartYear())
      }

      return { dateType: nextDateType }
    })
  }

  // DatePart is not updating value on blur
  handleOnBlur() {
    this.props.input.onBlur(this.props.input.value)
  }

  handleOnChange({
    datePartName: updatedDatePartName,
    value: updatedDatePartValue,
  }) {
    const { value: currentRangeValue } = this.props.input
    const { dateType } = this.state

    const updatedValue = getRangeValue({
      currentRangeValue,
      dateType,
      updatedDatePartName,
      updatedDatePartValue,
    })

    this.props.input.onChange(updatedValue)
  }

  // DatePart is not updating value on focus
  handleOnFocus() {
    this.props.input.onFocus(this.props.input.value)
  }

  render() {
    const {
      displayDateTypeRadios,
      displayLabel,
      displaySubLabels,
      input,
      meta,
      module,
      mountHidden,
    } = this.props
    const { dateType } = this.state

    return (
      <FieldTemplate
        displayError={
          meta && meta.error && meta.error.errorCode ? undefined : false
        }
        displayLabel={displayLabel}
        enableHelpNotifications={false}
        errorStyle={errorStyle}
        meta={meta}
        module={module}
        name={input.name}
      >
        {displayDateTypeRadios && (
          <DateTypeRadios
            dateType={dateType}
            dateTypes={DATE_TYPES}
            onDateTypeChange={this.handleDateTypeChange}
          />
        )}
        <DatePart
          disabled={dateType === BEFORE}
          displayLabel={displaySubLabels}
          input={this.getFieldInput('startDate')}
          isStartDate
          meta={{}}
          setYearInputRef={this.setStartYearInputRef}
        />
        {dateType !== SINGLE && (
          <div
            style={{
              float: 'left',
              marginTop: '1.75em',
              textAlign: 'center',
              width: '2em',
            }}
          >
            {'–'}
          </div>
        )}
        <DatePart
          displayLabel={displaySubLabels}
          hidden={dateType === SINGLE}
          input={this.getFieldInput('endDate')}
          isEndDate
          meta={{}}
          setYearInputRef={this.setEndYearInputRef}
        />
        {mountHidden && (
          <input
            className="hidden"
            {...input}
            name={`${input.name}.hidden`}
            onChange={this.props.input.onChange}
            type="hidden"
            value={input.value || ''}
          />
        )}
      </FieldTemplate>
    )
  }
}

DateRange.defaultProps = defaultProps
DateRange.propTypes = propTypes

export default DateRange
