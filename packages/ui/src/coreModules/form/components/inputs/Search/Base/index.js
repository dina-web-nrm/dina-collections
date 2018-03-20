import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Search } from 'semantic-ui-react'
import config from 'config'
import DefaultResultRenderer from './DefaultResultRenderer'

const propTypes = {
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool,
  mountHidden: PropTypes.bool,
  onSearchChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
    }).isRequired
  ).isRequired,
  resultRenderer: PropTypes.func,
  searchQuery: PropTypes.string,
}

const defaultProps = {
  isLoading: false,
  mountHidden: config.isTest,
  resultRenderer: DefaultResultRenderer,
  searchQuery: null,
}

class SearchBase extends Component {
  constructor(props) {
    super(props)
    this.getValue = this.getValue.bind(this)
    this.handleResultSelect = this.handleResultSelect.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  getValue() {
    const { input: { value }, searchQuery } = this.props

    const searchIsNotNull = searchQuery !== null

    if (searchIsNotNull) {
      return searchQuery
    }

    return value || ''
  }

  handleSearchChange(event, { value }) {
    // see Semantic docs for details: https://react.semantic-ui.com/modules/search
    this.props.onSearchChange(value)

    if (this.props.input.value) {
      // empty form value, if search is renewed after taxonName selected
      this.props.input.onChange('')
    }
  }

  handleResultSelect(event, { result }) {
    // see Semantic docs for details: https://react.semantic-ui.com/modules/search
    if (result && result.title) {
      const value = result.title

      this.props.input.onBlur(value)
      this.props.onSearchChange(null)
    }
  }

  render() {
    const {
      input,
      isLoading,
      resultRenderer,
      mountHidden,
      options,
    } = this.props
    const hiddenInputName = `${input.name}.hidden`
    const value = this.getValue()

    return (
      <React.Fragment>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          resultRenderer={resultRenderer}
          results={options}
          {...input}
          value={value}
        />
        {mountHidden && (
          <input
            hidden
            {...input}
            name={hiddenInputName}
            onChange={event => {
              const { value: title } = event.target
              this.handleResultSelect(event, { result: { title } })
            }}
            value={value}
          />
        )}
      </React.Fragment>
    )
  }
}

SearchBase.propTypes = propTypes
SearchBase.defaultProps = defaultProps

export default SearchBase
