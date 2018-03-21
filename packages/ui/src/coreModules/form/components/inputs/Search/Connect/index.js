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
  const selectedOption = input.value && getSelectedOption(state, input.value)

  return {
    isLoading: getSearchLoading(state),
    options: getOptions(state, searchQuery),
    searchQuery,
    text: selectedOption && selectedOption.text,
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
  options: PropTypes.array.isRequired,
  searchQuery: PropTypes.string,
  text: PropTypes.string,
}

const defaultProps = {
  isLoading: true,
  searchQuery: null,
  text: undefined,
}

class ConnectSearchInput extends Component {
  render() {
    const { options, isLoading, searchQuery, text, ...rest } = this.props

    return (
      <SearchBaseInput
        isLoading={isLoading}
        options={options}
        searchQuery={searchQuery}
        text={text}
        {...rest}
      />
    )
  }
}

ConnectSearchInput.propTypes = propTypes
ConnectSearchInput.defaultProps = defaultProps

// export default ConnectSearchInput
export default compose(connect(mapStateToProps))(ConnectSearchInput)
