import React, { Component } from 'react'
import PropTypes from 'prop-types'

import SearchInputWithResults from './SearchInputWithResults'
import DisplaySearchResult from '../DisplaySearchResult'
import { days, months, years } from './dateOptions'
import { DAY, MONTH, YEAR } from '../../../constants'

const createStringMatch = controlledValue => value => {
  return String(value).indexOf(String(controlledValue)) === 0
}
const mapToSemanticUiFormat = value => ({ key: value, title: value })

const getDateSuggestions = (datePart, controlledValue) => {
  const beginsWithSameDigits = createStringMatch(controlledValue)

  switch (datePart) {
    case DAY:
      return days.filter(beginsWithSameDigits).map(mapToSemanticUiFormat)
    case MONTH:
      return months.filter(beginsWithSameDigits).map(mapToSemanticUiFormat)
    case YEAR:
      return years
        .filter(beginsWithSameDigits)
        .slice(0, 10)
        .map(mapToSemanticUiFormat)
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
    // cast id to number since Semantic requires string id and does not allow
    // custom props name ("value" would have been better name than "id")
    if (result && result.title) {
      this.props.input.onBlur(Number(result.title))
    }
  }

  handleSearchChange(event, { value }) {
    // see Semantic docs for details: https://react.semantic-ui.com/modules/search
    this.props.input.onChange(Number(value))
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
        resultRenderer={DisplaySearchResult}
        results={getDateSuggestions(datePart, value)}
      />
    )
  }
}

InputDatePart.propTypes = propTypes
InputDatePart.defaultProps = defaultProps

export default InputDatePart
