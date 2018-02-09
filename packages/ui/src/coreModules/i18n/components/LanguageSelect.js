import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Dropdown } from 'semantic-ui-react'
import i18nLocalSelectors from 'coreModules/i18n/globalSelectors'
import { setLanguage as setLanguageActionCreator } from 'coreModules/i18n/actionCreators'

const mapStateToProps = state => ({
  availableLanguages: i18nLocalSelectors.getAvailableLanguages(state),
  language: i18nLocalSelectors.getLanguage(state),
})

const mapDispatchToProps = {
  setLanguage: setLanguageActionCreator,
}

const propTypes = {
  availableLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
  color: PropTypes.string,
  language: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  setLanguage: PropTypes.func.isRequired,
}

const defaultProps = {
  color: '',
  onChange: null,
}

export const LanguageSelect = ({
  availableLanguages,
  color,
  language,
  onChange: customOnChange,
  setLanguage,
}) => {
  const languageOptions = availableLanguages.map(availableLanguage => {
    return {
      key: availableLanguage,
      text: availableLanguage,
      value: availableLanguage,
    }
  })

  return (
    <Dropdown
      button
      className={color ? `icon ${color}` : 'icon'}
      floating
      icon="world"
      labeled
      onChange={(event, data) => {
        setLanguage(data.value)
        if (customOnChange) {
          customOnChange(data.value)
        }
      }}
      options={languageOptions}
      renderLabel={({ text }) => text}
      value={language}
    />
  )
}

LanguageSelect.propTypes = propTypes
LanguageSelect.defaultProps = defaultProps

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSelect)
