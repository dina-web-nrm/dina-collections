import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { DropdownSearch } from 'coreModules/form/components'
import { withI18n } from 'coreModules/i18n/higherOrderComponents'
import { FEATURE_OBSERVATION_TYPE_NAMES } from '../../constants'
import { updateFeatureTypeNameSearchQuery } from '../../actionCreators'
import globalSelectors from '../../globalSelectors'

const AVAILABLE_TYPE_NAMES = FEATURE_OBSERVATION_TYPE_NAMES.map(typeName => {
  return {
    key: typeName,
    textKey: typeName,
    value: typeName,
  }
})

const mapStateToProps = (state, { input }) => {
  return {
    searchQuery: globalSelectors.getFeatureTypeNameSearchQuery(
      state,
      input.name
    ),
  }
}
const mapDispatchToProps = {
  updateFeatureTypeNameSearchQuery,
}

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
  searchQuery: PropTypes.string,
  updateFeatureTypeNameSearchQuery: PropTypes.func.isRequired,
}

const defaultProps = {
  errorScope: undefined,
  helpText: undefined,
  label: undefined,
  required: false,
  searchQuery: undefined,
}

class FeatureTypeNameDropdown extends Component {
  constructor(props) {
    super(props)
    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  getMatchingResults(searchQuery) {
    if (!searchQuery) {
      return AVAILABLE_TYPE_NAMES.map(({ textKey, ...rest }) => {
        // replace textKey with text, which is the prop expected by Semantic
        // https://react.semantic-ui.com/modules/dropdown
        return {
          ...rest,
          text: this.props.i18n.moduleTranslate({ textKey }),
        }
      })
    }

    const lowerCaseSearchQuery = searchQuery.toLowerCase()

    return AVAILABLE_TYPE_NAMES.filter(({ textKey }) => {
      return this.props.i18n
        .moduleTranslate({
          textKey,
        })
        .toLowerCase()
        .includes(lowerCaseSearchQuery)
    }).map(({ textKey, ...rest }) => {
      // replace textKey with text, which is the prop expected by Semantic
      // https://react.semantic-ui.com/modules/dropdown
      return {
        ...rest,
        text: this.props.i18n.moduleTranslate({ textKey }),
      }
    })
  }

  handleSearchChange(event, { searchQuery }) {
    this.props.updateFeatureTypeNameSearchQuery({
      inputName: this.props.input.name,
      searchQuery,
    })
  }

  handleSelect(event, { value }) {
    this.props.updateFeatureTypeNameSearchQuery({
      inputName: this.props.input.name,
      searchQuery: '',
    })
    this.props.input.onBlur(value)
  }

  render() {
    const {
      errorScope,
      helpText,
      i18n, // omitting this from rest
      input,
      label,
      meta,
      required,
      searchQuery,
    } = this.props

    const { value } = input

    return (
      <DropdownSearch
        errorScope={errorScope}
        helpText={helpText}
        initialText={i18n.moduleTranslate({
          textKey: 'featureType',
        })}
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
        options={this.getMatchingResults(searchQuery)}
        required={required}
        searchQuery={searchQuery}
      />
    )
  }
}

FeatureTypeNameDropdown.propTypes = propTypes
FeatureTypeNameDropdown.defaultProps = defaultProps

export default compose(
  withI18n({
    module: 'collectionMammals',
    scope: 'featureObservations',
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(FeatureTypeNameDropdown)
