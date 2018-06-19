import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { createSelector } from 'reselect'
import MultipleSearchSelectionBase from '../Base'

const propTypes = {
  filterOptions: PropTypes.func,
  initialText: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
  }).isRequired,
  isLoading: PropTypes.bool,
  limit: PropTypes.number,
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
  isLoading: undefined,
  limit: 10,
  parse: undefined,
}

const createSelectedOptionSelector = options => {
  return createSelector(
    values => values,
    values => {
      return (
        values &&
        values.map(value => {
          return options.find(item => {
            return item.value === value
          })
        })
      )
    }
  )
}

class MultipleSearchSelectionLocalInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filteredOptions: this.getFilteredOptions(),
      searchQuery: '',
    }
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.getSelectedOptions = this.getSelectedOptions.bind(this)
    this.optionSelector = createSelectedOptionSelector(props.options)
  }

  componentWillReceiveProps(nextProps) {
    const noOptionsNow = !this.props.options || !this.props.options.length
    const hasOptionsNext = nextProps.options && nextProps.options.length
    if (noOptionsNow && hasOptionsNext) {
      this.setState({
        filteredOptions: this.getFilteredOptions({
          nextOptions: nextProps.options,
        }),
      })
      this.optionSelector = createSelectedOptionSelector(nextProps.options)
    }
  }

  getFilteredOptions({ searchQuery, nextOptions } = {}) {
    const { filterOptions, options: currentOptions, limit } = this.props

    const options = nextOptions || currentOptions

    let filteredOptions = [...options]

    if (filterOptions) {
      return filterOptions({ options, searchQuery })
    }

    if (searchQuery) {
      const lowerCaseSearchQuery = searchQuery.toLowerCase()

      const firstLetterMatches = options.filter(({ text }) => {
        return text.toLowerCase().indexOf(lowerCaseSearchQuery) === 0
      })

      const otherMatches = options.filter(({ text }) => {
        return text.toLowerCase().indexOf(lowerCaseSearchQuery) > 0
      })

      filteredOptions = [...firstLetterMatches, ...otherMatches]
    }

    if (limit) {
      return filteredOptions.splice(0, limit)
    }

    return filteredOptions
  }

  getSelectedOptions() {
    const { input } = this.props
    if (input.value === undefined) {
      return []
    }
    const res = this.optionSelector(input.value)
    return res
  }

  handleSearchChange({ searchQuery }) {
    this.setState({
      filteredOptions: this.getFilteredOptions({ searchQuery }),
      searchQuery,
    })
  }

  render() {
    const { initialText, input, isLoading, parse } = this.props
    const { filteredOptions, searchQuery } = this.state
    return (
      <MultipleSearchSelectionBase
        initialText={initialText}
        input={input}
        isLoading={isLoading}
        onSearchChange={this.handleSearchChange}
        options={filteredOptions}
        parse={parse}
        searchQuery={searchQuery}
        selectedOptions={this.getSelectedOptions()}
      />
    )
  }
}

MultipleSearchSelectionLocalInput.propTypes = propTypes
MultipleSearchSelectionLocalInput.defaultProps = defaultProps

export default MultipleSearchSelectionLocalInput
