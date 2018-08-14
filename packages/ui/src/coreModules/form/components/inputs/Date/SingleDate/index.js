import React, { Component } from 'react'
import PropTypes from 'prop-types'
import config from 'config'
import TextDate from './TextDate'
import ExactDate from './ExactDate'
import DateView from '../DateView'
import TodayButton from './TodayButton'
import FlexibleDate from './FlexibleDate'

import {
  createSingleDateUpdatedValue,
  extractExactFieldValue,
} from '../utilities'

const propTypes = {
  displayExact: PropTypes.bool,
  displayFlexible: PropTypes.bool,
  displaySubLabels: PropTypes.bool,
  displayText: PropTypes.bool,
  displayTodayButton: PropTypes.bool,
  fluid: PropTypes.bool,
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  mountHidden: PropTypes.bool,
  stack: PropTypes.bool,
}

const defaultProps = {
  displayExact: true,
  displayFlexible: false,
  displaySubLabels: false,
  displayText: false,
  displayTodayButton: false,
  fluid: false,
  mountHidden: config.isTest,
  stack: false,
}

class SingleDate extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }
  getFieldInput(field) {
    const { input } = this.props
    const fieldName = `${input.name}.${
      field === 'exactDate' ? field : 'dateText'
    }`

    let fieldValue
    if (field === 'exactDate') {
      fieldValue = extractExactFieldValue({ value: input.value })
    }

    if (field === 'textDate') {
      fieldValue = (input.value && input.value.dateText) || ''
    }

    if (field === 'flexibleDate') {
      fieldValue = input.value
    }

    const updatedInput = {
      name: fieldName,
      onBlur: () => {
        this.handleOnBlur()
      },
      onChange: value => {
        this.handleOnChange({
          field,
          value,
        })
      },
      onFocus: () => {
        this.handleOnFocus()
      },
      value: fieldValue,
    }
    return updatedInput
  }

  handleOnBlur() {
    const { value: currentValue } = this.props.input
    this.props.input.onBlur(currentValue)
  }

  handleOnChange({ field, value }) {
    const { value: currentValue } = this.props.input
    const updatedValue = createSingleDateUpdatedValue({
      currentValue,
      field,
      value,
    })
    this.props.input.onChange(updatedValue)
  }

  handleOnFocus() {
    const { value: currentValue } = this.props.input
    this.props.input.onFocus(currentValue)
  }

  render() {
    const {
      displayExact,
      displayFlexible,
      displaySubLabels,
      displayText,
      displayTodayButton,
      fluid,
      input,
      meta,
      mountHidden,
      stack,
    } = this.props

    let exactDate
    let textDate
    let todayButton
    let flexibleDate

    if (displayTodayButton) {
      todayButton = (
        <TodayButton
          displaySubLabel={displaySubLabels}
          onClick={event => {
            event.preventDefault()
            this.handleOnChange({
              field: 'todayButton',
            })
          }}
        />
      )
    }

    if (displayExact) {
      exactDate = (
        <ExactDate
          displaySubLabel={displaySubLabels}
          input={this.getFieldInput('exactDate')}
          meta={meta}
        />
      )
    }

    if (displayText) {
      textDate = (
        <TextDate
          displaySubLabel={displaySubLabels}
          input={this.getFieldInput('textDate')}
          meta={meta}
        />
      )
    }

    if (displayFlexible) {
      flexibleDate = (
        <FlexibleDate
          displaySubLabel={displaySubLabels}
          fluid={fluid}
          input={this.getFieldInput('flexibleDate')}
          meta={meta}
        />
      )
    }

    const components = []

    if (todayButton) {
      components.push(todayButton)
    }

    if (flexibleDate) {
      components.push(flexibleDate)
    }
    if (exactDate) {
      components.push(exactDate)
    }

    if (textDate) {
      components.push(textDate)
    }

    let styles
    if (components.length === 2 && !stack && todayButton) {
      styles = [
        { maxWidth: '20%', paddingRight: 0, width: 'auto' },
        { width: '80%' },
      ]
    }
    if (components.length === 3 && !stack) {
      styles = [
        { maxWidth: '20%', paddingRight: 0, width: 'auto' },
        { paddingLeft: 0, width: '40%' },
        { width: '40%' },
      ]
    }

    const dateView = (
      <DateView components={components} stack={stack} styles={styles} />
    )
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

SingleDate.defaultProps = defaultProps
SingleDate.propTypes = propTypes

export default SingleDate
