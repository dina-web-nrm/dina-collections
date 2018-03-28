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
  selectedOption: PropTypes.object,
}

const defaultProps = {
  isLoading: false,
  mountHidden: config.isTest,
  resultRenderer: DefaultResultRenderer,
  searchQuery: null,
  selectedOption: null,
}

class SearchBase extends Component {
  constructor(props) {
    super(props)
    this.handleResultSelect = this.handleResultSelect.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  handleSearchChange(event, { value }) {
    // see Semantic docs for details: https://react.semantic-ui.com/modules/search
    this.props.onSearchChange({
      inputName: this.props.input.name,
      searchQuery: value,
    })

    if (this.props.input.value) {
      // empty form value, if search is renewed after a value was selected
      this.props.input.onChange('')
    }
  }

  handleResultSelect(event, { result: { value } }) {
    // see Semantic docs for details: https://react.semantic-ui.com/modules/search
    this.handleSearchChange(null, { value: '' })

    this.props.input.onBlur(value)
  }

  render() {
    const {
      input,
      isLoading,
      resultRenderer,
      mountHidden,
      options,
      searchQuery,
      selectedOption,
    } = this.props

    const hiddenInputName = `${input.name}.hidden`

    return (
      <React.Fragment>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          resultRenderer={resultRenderer}
          results={options}
          {...input}
          onBlur={undefined}
          value={searchQuery || (selectedOption && selectedOption.text) || ''}
        />
        {mountHidden && (
          <input
            hidden
            {...input}
            name={hiddenInputName}
            onChange={event => {
              this.handleResultSelect(event, {
                result: { value: event.target.value },
              })
            }}
          />
        )}
      </React.Fragment>
    )
  }
}

SearchBase.propTypes = propTypes
SearchBase.defaultProps = defaultProps

export default SearchBase
