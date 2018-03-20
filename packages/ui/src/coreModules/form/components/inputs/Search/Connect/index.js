import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import SearchBaseInput from '../Base'

const mapStateToProps = (
  state,
  { getOptions, getSearchQuery, getSearchLoading }
) => {
  const searchQuery = getSearchQuery(state)
  return {
    isLoading: getSearchLoading(state),
    options: getOptions(state, searchQuery),
    searchQuery,
  }
}

const propTypes = {
  getOptions: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  options: PropTypes.array.isRequired,
  searchQuery: PropTypes.string,
}

const defaultProps = {
  isLoading: true,
  searchQuery: null,
}

class ConnectSearchInput extends Component {
  render() {
    const { options, isLoading, searchQuery, ...rest } = this.props
    return (
      <SearchBaseInput
        isLoading={isLoading}
        options={options}
        searchQuery={searchQuery}
        {...rest}
      />
    )
  }
}

ConnectSearchInput.propTypes = propTypes
ConnectSearchInput.defaultProps = defaultProps

// export default ConnectSearchInput
export default compose(connect(mapStateToProps))(ConnectSearchInput)
