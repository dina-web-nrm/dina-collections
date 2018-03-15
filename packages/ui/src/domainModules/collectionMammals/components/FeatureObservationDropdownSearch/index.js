import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import createLog from 'utilities/log'
import { DropdownSearch } from 'coreModules/form/components'

const log = createLog(
  'domainModules:collectionMammals:FeatureObservationDropdownSearch'
)

const mapStateToProps = (state, { getSearchQuery, input }) => {
  log.debug('input.value', input.value)
  return {
    searchQuery: getSearchQuery(state, input.name),
  }
}

const propTypes = {
  errorScope: PropTypes.string,
  getSearchQuery: PropTypes.func.isRequired, // eslint-disable-line react/no-unused-prop-types
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  initialText: PropTypes.string,
  input: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  meta: PropTypes.shape({
    error: PropTypes.object,
    touched: PropTypes.bool.isRequired,
  }).isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  required: PropTypes.bool,
  searchQuery: PropTypes.string,
  updateSearchQuery: PropTypes.func.isRequired,
}

const defaultProps = {
  errorScope: undefined,
  helpText: undefined,
  initialText: undefined,
  label: undefined,
  required: false,
  searchQuery: undefined,
}

class FeatureObservationDropdownSearch extends Component {
  constructor(props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  getMatchingResults(searchQuery) {
    log.debug('get matching results for searchQuery', searchQuery)
    const { options } = this.props

    if (!searchQuery) {
      return options
    }

    const lowerCaseSearchQuery = searchQuery.toLowerCase()

    return options.filter(({ text }) => {
      return text.toLowerCase().includes(lowerCaseSearchQuery)
    })
  }

  handleSearchChange(event, { searchQuery }) {
    this.props.updateSearchQuery({
      inputName: this.props.input.name,
      searchQuery,
    })
  }

  handleSelect(event, { value }) {
    this.props.updateSearchQuery({
      inputName: this.props.input.name,
      searchQuery: '',
    })
    this.props.input.onBlur(value)
  }

  render() {
    const {
      errorScope,
      helpText,
      initialText,
      input,
      label,
      meta,
      options,
      required,
      searchQuery,
      ...rest
    } = this.props

    const { name, value } = input

    log.debug('render value', value)
    return (
      <DropdownSearch
        errorScope={errorScope}
        helpText={helpText}
        initialText={initialText}
        input={{
          name,
          value,
        }}
        label={label}
        meta={meta}
        onChange={this.handleSelect}
        onSearchChange={this.handleSearchChange}
        required={required}
        selectOnBlur={false}
        {...rest}
        options={
          // putting options last to override options in rest
          this.getMatchingResults(searchQuery)
        }
      />
    )
  }
}

FeatureObservationDropdownSearch.propTypes = propTypes
FeatureObservationDropdownSearch.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(
  FeatureObservationDropdownSearch
)
