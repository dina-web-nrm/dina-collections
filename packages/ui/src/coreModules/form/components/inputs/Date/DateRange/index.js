import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'config'
import SingleDateComponent from '../../../fields/Date/SingleDate/Component'
import TextDate from '../SingleDate/TextDate'
import { getFieldMeta } from '../utilities'
import DateView from '../DateView'

const propTypes = {
  componentErrors: PropTypes.object,
  displaySubLabels: PropTypes.bool,
  displayText: PropTypes.bool,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  mountHidden: PropTypes.bool,
  stack: PropTypes.bool,
}

const defaultProps = {
  componentErrors: {},
  displaySubLabels: true,
  displayText: false,
  mountHidden: config.isTest,
  stack: false,
}

class DateRange extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
    this.getFieldInput = this.getFieldInput.bind(this)
  }

  getFieldInput(field) {
    const { input } = this.props
    const fieldName = `${input.name}.${field}`

    const updatedInput = {
      name: fieldName,
      onBlur: value => {
        this.handleOnBlur({
          field,
          value,
        })
      },
      onChange: value => {
        this.handleOnChange({
          field,
          value,
        })
      },
      onFocus: value => {
        this.handleOnFocus({
          field,
          value,
        })
      },
      value: input.value[field],
    }
    return updatedInput
  }
  handleOnChange({ field, value }) {
    const { value: currentValue } = this.props.input

    const updatedValue = {
      ...currentValue,
      [field]: value,
    }
    this.props.input.onChange(updatedValue)
  }

  handleOnBlur({ field, value }) {
    const { value: currentValue } = this.props.input

    const updatedValue = {
      ...currentValue,
      [field]: value,
    }
    this.props.input.onBlur(updatedValue)
  }

  handleOnFocus({ field, value }) {
    const { value: currentValue } = this.props.input

    const updatedValue = {
      ...currentValue,
      [field]: value,
    }
    this.props.input.onFocus(updatedValue)
  }

  render() {
    const {
      displaySubLabels,
      displayText,
      input,
      mountHidden,
      stack,
    } = this.props

    const startDate = (
      <SingleDateComponent
        {...this.props}
        displayExact={false}
        displayFlexible
        displaySubLabels={false}
        displayText={false}
        enableHelpNotifications={false}
        input={this.getFieldInput('startDate')}
        label={displaySubLabels ? 'Start date' : undefined}
        meta={getFieldMeta({
          field: 'startDate',
          props: this.props,
        })}
      />
    )
    const endDate = (
      <SingleDateComponent
        {...this.props}
        displayExact={false}
        displayFlexible
        displaySubLabels={false}
        displayText={false}
        enableHelpNotifications={false}
        input={this.getFieldInput('endDate')}
        isEndDate
        label={displaySubLabels ? 'End date' : undefined}
        meta={getFieldMeta({
          field: 'endDate',
          props: this.props,
        })}
      />
    )

    const textDate = displayText && (
      <TextDate
        {...this.props}
        displayExact={false}
        displaySubLabel={displaySubLabels}
        displayText
        enableHelpNotifications={false}
        input={this.getFieldInput('dateText')}
        label={displaySubLabels ? 'Date text' : undefined}
        meta={getFieldMeta({
          field: 'dateText',
          props: this.props,
        })}
      />
    )

    const components = []

    if (startDate) {
      components.push(startDate)
    }
    if (endDate) {
      components.push(endDate)
    }

    if (textDate) {
      components.push(textDate)
    }

    const dateView = <DateView components={components} stack={stack} />
    if (!mountHidden) {
      return dateView
    }

    const hiddenInputName = `${input.name}.hidden`
    return (
      <React.Fragment>
        {dateView}
        <input
          className="hidden"
          {...input}
          name={hiddenInputName}
          onChange={this.props.input.onChange}
          type="hidden"
          value={input.value || ''}
        />
      </React.Fragment>
    )
  }
}

DateRange.defaultProps = defaultProps
DateRange.propTypes = propTypes

export default DateRange
