import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'

import {
  SearchInputWithResults,
  TranslateSearchResult,
} from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { FEATURE_OBSERVATION_TYPE_NAMES } from '../../constants'

const AVAILABLE_TYPE_NAMES = FEATURE_OBSERVATION_TYPE_NAMES.map(typeName => {
  return {
    key: typeName,
    textKey: typeName,
    value: typeName,
  }
})

const propTypes = {
  errorScope: PropTypes.string,
  helpText: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  i18n: PropTypes.shape({
    moduleTranslate: PropTypes.func.isRequired,
  }).isRequired,
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
  required: PropTypes.bool,
}

const defaultProps = {
  errorScope: undefined,
  helpText: undefined,
  label: undefined,
  required: false,
}

class FeatureTypeNameSearch extends Component {
  constructor(props) {
    super(props)
    this.handleResultSelect = this.handleResultSelect.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  getMatchingResults(searchQuery) {
    if (!searchQuery) {
      return AVAILABLE_TYPE_NAMES
    }

    return AVAILABLE_TYPE_NAMES.filter(({ textKey }) => {
      return this.props.i18n
        .moduleTranslate({
          textKey,
        })
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    })
  }

  handleResultSelect(event, { result }) {
    // see Semantic docs for details: https://react.semantic-ui.com/modules/search
    if (result && result.content && result.content.value) {
      this.props.input.onBlur(result.content.value)
    }
  }

  handleSearchChange(event, { value }) {
    // see Semantic docs for details: https://react.semantic-ui.com/modules/search
    this.props.input.onChange(value)
  }

  render() {
    const {
      errorScope,
      helpText,
      i18n,
      input,
      label,
      meta,
      required,
      ...rest
    } = this.props

    const { value } = input

    return (
      <SearchInputWithResults
        errorScope={errorScope}
        handleResultSelect={this.handleResultSelect}
        handleSearchChange={this.handleSearchChange}
        helpText={helpText}
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
        required={required}
        resultRenderer={TranslateSearchResult}
        results={this.getMatchingResults(value)}
        {...rest}
      />
    )
  }
}

FeatureTypeNameSearch.propTypes = propTypes
FeatureTypeNameSearch.defaultProps = defaultProps

export default compose(
  withI18n({
    module: 'collectionMammals',
    scope: 'featureObservations',
  })
)(FeatureTypeNameSearch)
