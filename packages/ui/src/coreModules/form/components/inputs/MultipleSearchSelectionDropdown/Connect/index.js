import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import MultipleSearchSelectionBase from '../Base'

const mapStateToProps = (
  state,
  { getSearchQuery, getOptions, getSelectedOptions, input }
) => {
  const searchQuery = getSearchQuery(state, input.name)
  const selectedOptions =
    (input.value &&
      getSelectedOptions &&
      getSelectedOptions(state, input.value)) ||
    null

  return {
    options: getOptions(state, searchQuery),
    searchQuery,
    selectedOptions,
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
  multiple: PropTypes.bool,
  onSearchChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  searchQuery: PropTypes.string,
  selectedOptions: PropTypes.object,
}

const defaultProps = {
  getSelectedOption: undefined,
  initialText: undefined,
  multiple: false,
  searchQuery: '',
  selectedOptions: null,
}

class MultipleSearchSelectionConnectInput extends Component {
  render() {
    const {
      initialText,
      input,
      onSearchChange,
      options,
      searchQuery,
      selectedOptions,
      ...rest
    } = this.props

    return (
      <MultipleSearchSelectionBase
        initialText={initialText}
        input={input}
        onSearchChange={onSearchChange}
        options={options}
        searchQuery={searchQuery}
        selectedOptions={selectedOptions}
        {...rest}
      />
    )
  }
}

MultipleSearchSelectionConnectInput.propTypes = propTypes
MultipleSearchSelectionConnectInput.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(
  MultipleSearchSelectionConnectInput
)
