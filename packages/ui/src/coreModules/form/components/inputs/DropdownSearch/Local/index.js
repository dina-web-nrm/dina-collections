import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DropdownSearchBaseInput from '../Base'

const propTypes = {
  filterOptions: PropTypes.func,
  initialText: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  parse: PropTypes.func,
}

const defaultProps = {
  filterOptions: undefined,
  initialText: undefined,
  parse: undefined,
}

class DropdownSearchLocalInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredOptions: props.options,
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  getFilteredOptions(searchQuery) {
    const { filterOptions, options } = this.props

    if (filterOptions) {
      return filterOptions({ options, searchQuery })
    }

    if (!searchQuery) {
      return options
    }

    const lowerCaseSearchQuery = searchQuery.toLowerCase()

    const firstLetterMatches = options.filter(({ text }) => {
      return text.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
    })

    const otherMatches = options.filter(({ text }) => {
      return text.toLowerCase().indexOf(lowerCaseSearchQuery) > 0
    })

    return [...firstLetterMatches, ...otherMatches]
  }

  handleSearchChange({ searchQuery }) {
    this.setState({
      filteredOptions: this.getFilteredOptions(searchQuery),
    })
  }

  render() {
    const { initialText, input, parse } = this.props

    const { filteredOptions } = this.state

    return (
      <DropdownSearchBaseInput
        initialText={initialText}
        input={input}
        onSearchChange={this.handleSearchChange}
        options={filteredOptions}
        parse={parse}
      />
    )
  }
}

DropdownSearchLocalInput.propTypes = propTypes
DropdownSearchLocalInput.defaultProps = defaultProps

export default DropdownSearchLocalInput
