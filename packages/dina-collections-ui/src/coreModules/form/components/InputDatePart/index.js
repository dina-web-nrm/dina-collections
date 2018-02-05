import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SearchInputWithResults from 'coreModules/form/components/SearchInputWithResults'
import TranslateSearchResult from '../TranslateSearchResult'
import { days, months, years } from './dateOptions'
import { DAY, MONTH, YEAR } from '../../constants'

const createStringMatch = controlledValue => ({ value }) => {
  return String(value).indexOf(String(controlledValue)) === 0
}

const getDateSuggestions = (datePart, controlledValue) => {
  const beginsWithSameDigits = createStringMatch(controlledValue)

  switch (datePart) {
    case DAY:
      return days.filter(beginsWithSameDigits)
    case MONTH:
      return months.filter(beginsWithSameDigits)
    case YEAR:
      return years.filter(beginsWithSameDigits).slice(0, 10)
    default:
      return []
  }
}

const propTypes = {
  datePart: PropTypes.oneOf([DAY, MONTH, YEAR]).isRequired,
  errorScope: PropTypes.string,
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  required: PropTypes.bool,
}

const defaultProps = {
  errorScope: undefined,
  helpText: undefined,
  label: undefined,
  required: false,
}

class InputDatePart extends Component {
  constructor(props) {
    super(props)
    this.handleResultSelect = this.handleResultSelect.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  handleResultSelect(event, { result }) {
    // see Semantic docs for details: https://react.semantic-ui.com/modules/search
    if (result && result.content && result.content.value) {
      this.props.input.onBlur(result.content.value)
    }
  }

  handleSearchChange(event, { value }) {
    // see Semantic docs for details: https://react.semantic-ui.com/modules/search
    this.props.input.onChange(value)
  }

  render() {
    const {
      datePart,
      errorScope,
      helpText,
      input,
      label,
      meta,
      required,
    } = this.props

    const { value } = input

    return (
      <SearchInputWithResults
        errorScope={errorScope}
        handleResultSelect={this.handleResultSelect}
        handleSearchChange={this.handleSearchChange}
        helpText={helpText}
        icon={null} // skip search icon
        input={{
          name: input.name,
          value,
        }}
        label={label}
        meta={meta}
        required={required}
        resultRenderer={TranslateSearchResult}
        results={getDateSuggestions(datePart, value)}
      />
    )
  }
}

InputDatePart.propTypes = propTypes
InputDatePart.defaultProps = defaultProps

export default InputDatePart
