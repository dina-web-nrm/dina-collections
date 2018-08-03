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
    undefined

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
  multiple: PropTypes.bool,
  onSearchChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    })
  ).isRequired,
  searchQuery: PropTypes.string,
  selectedOptions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      type: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    })
  ),
}

const defaultProps = {
  getSelectedOption: undefined,
  initialText: undefined,
  multiple: false,
  searchQuery: '',
  selectedOptions: undefined,
}

class MultipleSearchSelectionConnectInput extends Component {
  render() {
    const {
      initialText,
      onSearchChange,
      options,
      searchQuery,
      selectedOptions,
      ...rest
    } = this.props

    return (
      <MultipleSearchSelectionBase
        initialText={initialText}
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
