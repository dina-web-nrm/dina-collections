import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import SearchBaseInput from '../Base'

const mapStateToProps = (
  state,
  { getOptions, getSearchQuery, getSearchLoading, getSelectedOption, input }
) => {
  const searchQuery = getSearchQuery(state, input.name)
  const selectedOption =
    (input.value && getSelectedOption(state, input.value)) || null

  return {
    isLoading: getSearchLoading(state),
    options: getOptions(state, searchQuery),
    searchQuery,
    selectedOption,
  }
}

const propTypes = {
  getOptions: PropTypes.func.isRequired,
  getSearchLoading: PropTypes.func.isRequired,
  getSearchQuery: PropTypes.func.isRequired,
  getSelectedOption: PropTypes.func.isRequired,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
  isLoading: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    }).isRequired
  ).isRequired,
  searchQuery: PropTypes.string,
  selectedOption: PropTypes.object,
}

const defaultProps = {
  isLoading: true,
  searchQuery: null,
  selectedOption: null,
}

class ConnectSearchInput extends Component {
  render() {
    const {
      isLoading,
      options,
      searchQuery,
      selectedOption,
      ...rest
    } = this.props

    return (
      <SearchBaseInput
        isLoading={isLoading}
        options={options}
        searchQuery={searchQuery}
        selectedOption={selectedOption}
        {...rest}
      />
    )
  }
}

ConnectSearchInput.propTypes = propTypes
ConnectSearchInput.defaultProps = defaultProps

// export default ConnectSearchInput
export default compose(connect(mapStateToProps))(ConnectSearchInput)
