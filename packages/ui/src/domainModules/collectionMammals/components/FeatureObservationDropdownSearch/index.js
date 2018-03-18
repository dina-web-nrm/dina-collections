import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import createLog from 'utilities/log'
import { Dropdown } from 'coreModules/form/components'
import i18nSelectors from 'coreModules/i18n/globalSelectors'

const log = createLog(
  'modules:collectionMammals:FeatureObservationDropdownSearch'
)

const mapSelectablesToDropdownOptions = (
  selectables,
  { language, defaultLanguage } = {}
) => {
  return selectables.map(({ key, name }) => {
    if (typeof name === 'string') {
      return {
        key,
        text: name,
        value: key,
      }
    }

    const potentialBackendTranslation =
      (language || defaultLanguage) && (name[language] || name[defaultLanguage])

    return {
      key,
      text: potentialBackendTranslation || key,
      value: key,
    }
  })
}

const mapStateToProps = state => {
  return {
    defaultLanguage: i18nSelectors.getDefaultLanguage(state),
    language: i18nSelectors.getLanguage(state),
  }
}

const propTypes = {
  defaultLanguage: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  rawOptions: PropTypes.array.isRequired,
  updateSearchQuery: PropTypes.func.isRequired,
}

class FeatureObservationDropdownSearch extends Component {
  constructor(props) {
    super(props)
    const { rawOptions, defaultLanguage, language } = props

    this.getMatchingResults = this.getMatchingResults.bind(this)
    this.format = this.format.bind(this)

    this.state = {
      options:
        !!props.rawOptions &&
        mapSelectablesToDropdownOptions(rawOptions, {
          defaultLanguage,
          language,
        }),
    }
  }

  getMatchingResults(searchQuery) {
    const { options } = this.state

    if (!searchQuery) {
      return options
    }

    const lowerCaseSearchQuery = searchQuery.toLowerCase()

    return options.filter(({ text }) => {
      return text.toLowerCase().includes(lowerCaseSearchQuery)
    })
  }

  format(value) {
    const { options } = this.state

    const option = options.find(
      ({ value: optionValue }) => optionValue === value
    )
    return option && option.text
  }

  render() {
    const { ...rest } = this.props

    log.render()
    return (
      <Dropdown
        {...rest}
        format={this.format}
        getOptions={this.getMatchingResults}
        type="dropdown-search-local"
      />
    )
  }
}

FeatureObservationDropdownSearch.propTypes = propTypes

export default compose(connect(mapStateToProps))(
  FeatureObservationDropdownSearch
)
