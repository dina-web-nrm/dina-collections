import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'

import createLog from 'utilities/log'
import { DropdownSearch } from 'coreModules/form/components'
import i18nSelectors from 'coreModules/i18n/globalSelectors'

const log = createLog('modules:curatedList:FeatureObservationDropdownSearch')

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
}

class FeatureObservationDropdownSearch extends Component {
  render() {
    const { defaultLanguage, language, rawOptions, ...rest } = this.props

    log.render()
    return (
      <DropdownSearch
        {...rest}
        options={
          !!rawOptions &&
          mapSelectablesToDropdownOptions(rawOptions, {
            defaultLanguage,
            language,
          })
        }
        type="dropdown-search-local"
      />
    )
  }
}

FeatureObservationDropdownSearch.propTypes = propTypes

export default compose(connect(mapStateToProps))(
  FeatureObservationDropdownSearch
)
