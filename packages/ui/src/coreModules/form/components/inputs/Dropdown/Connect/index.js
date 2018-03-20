import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import DropdownSearchBaseInput from '../Base'

const mapStateToProps = (state, { getSearchQuery, getOptions, input }) => {
  const searchQuery = getSearchQuery(state, input.name)
  return {
    options: getOptions(state, searchQuery),
    searchQuery,
  }
}

const propTypes = {
  getOptions: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  getSearchQuery: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
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
}

const defaultProps = {
  initialText: undefined,
}

class CustomDropdownSearchInput extends Component {
  render() {
    const { initialText, input, options, onSearchChange } = this.props
    return (
      <DropdownSearchBaseInput
        initialText={initialText}
        input={input}
        onSearchChange={onSearchChange}
        options={options}
      />
    )
  }
}

CustomDropdownSearchInput.propTypes = propTypes
CustomDropdownSearchInput.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(CustomDropdownSearchInput)
