import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import createLog from 'utilities/log'
import { DropdownSearch } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'

const log = createLog('domainModules:collectionMammals:LocalityDropdownSearch')

const createMapTextKeyToTranslatedText = i18n => ({ textKey, ...rest }) => {
  // replace textKey with text, which is the prop expected by Semantic
  // https://react.semantic-ui.com/modules/dropdown
  return {
    ...rest,
    text: i18n.moduleTranslate({ fallback: textKey, textKey }),
  }
}

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
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
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
      textKey: PropTypes.string.isRequired,
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

class LocalityDropdownSearch extends Component {
  constructor(props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.mapTextKeyToTranslatedText = createMapTextKeyToTranslatedText(
      props.i18n
    )
  }

  getMatchingResults(searchQuery) {
    log.debug('get matching results for searchQuery', searchQuery)
    const { i18n, options } = this.props

    if (!searchQuery) {
      log.debug(
        'options.map(this.mapTextKeyToTranslatedText)',
        options.map(this.mapTextKeyToTranslatedText)
      )
      return options.map(this.mapTextKeyToTranslatedText)
    }

    const lowerCaseSearchQuery = searchQuery.toLowerCase()
    log.debug(
      'options.filter.map',
      options
        .filter(({ textKey }) => {
          return i18n
            .moduleTranslate({
              textKey,
            })
            .toLowerCase()
            .includes(lowerCaseSearchQuery)
        })
        .map(this.mapTextKeyToTranslatedText)
    )
    return options.map(this.mapTextKeyToTranslatedText).filter(({ text }) => {
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
      i18n,
      initialText,
      input,
      label,
      meta,
      required,
      searchQuery,
      ...rest
    } = this.props

    const { value } = input

    log.debug('render value', value)
    return (
      <DropdownSearch
        errorScope={errorScope}
        helpText={helpText}
        initialText={initialText}
        input={{
          name: input.name,
          value: value
            ? i18n.moduleTranslate({
                fallback: value,
                textKey: value,
              })
            : '',
        }}
        label={label}
        meta={meta}
        onChange={this.handleSelect}
        onSearchChange={this.handleSearchChange}
        required={required}
        searchQuery={searchQuery}
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

LocalityDropdownSearch.propTypes = propTypes
LocalityDropdownSearch.defaultProps = defaultProps

export default compose(
  withI18n({
    module: 'collectionMammals',
    scope: 'occurrences.localityInformation',
  }),
  connect(mapStateToProps)
)(LocalityDropdownSearch)
