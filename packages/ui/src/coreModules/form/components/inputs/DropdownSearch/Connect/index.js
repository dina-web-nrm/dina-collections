import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import DropdownSearchBaseInput from '../Base'

const mapStateToProps = (
  state,
  { getSearchQuery, getOptions, getSelectedOption, input }
) => {
  const searchQuery = getSearchQuery(state, input.name)
  const selectedOption =
    (input.value &&
      getSelectedOption &&
      getSelectedOption(state, input.value)) ||
    null

  return {
    options: getOptions(state, searchQuery),
    searchQuery,
    selectedOption,
  }
}

const propTypes = {
  getOptions: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  getSearchQuery: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  getSelectedOption: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  initialText: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  onSearchChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  searchQuery: PropTypes.string,
  selectedOption: PropTypes.object,
}

const defaultProps = {
  getSelectedOption: undefined,
  initialText: undefined,
  searchQuery: '',
  selectedOption: null,
}

class CustomDropdownSearchInput extends Component {
  render() {
    const {
      initialText,
      input,
      onSearchChange,
      options,
      searchQuery,
      selectedOption,
    } = this.props

    return (
      <DropdownSearchBaseInput
        initialText={initialText}
        input={input}
        onSearchChange={onSearchChange}
        options={options}
        searchQuery={searchQuery}
        selectedOption={selectedOption}
      />
    )
  }
}

CustomDropdownSearchInput.propTypes = propTypes
CustomDropdownSearchInput.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(CustomDropdownSearchInput)
