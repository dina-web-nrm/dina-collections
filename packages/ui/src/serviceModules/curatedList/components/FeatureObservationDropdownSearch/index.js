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
  placeholder: PropTypes.string,
  rawOptions: PropTypes.array.isRequired,
}

const defaultProps = {
  placeholder: undefined,
}

class FeatureObservationDropdownSearch extends Component {
  render() {
    const {
      defaultLanguage,
      language,
      placeholder,
      rawOptions,
      ...rest
    } = this.props

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
        placeholder={placeholder}
        type="dropdown-search-local"
      />
    )
  }
}

FeatureObservationDropdownSearch.propTypes = propTypes
FeatureObservationDropdownSearch.defaultProps = defaultProps

export default compose(connect(mapStateToProps))(
  FeatureObservationDropdownSearch
)
