import React from 'react'
import PropTypes from 'prop-types'

import {
  capitalizeFirstLetter,
  getTranslationByPath,
  outputIsATextKey,
} from '../utilities'

const contextTypes = {
  language: PropTypes.string.isRequired,
  markdown: PropTypes.object.isRequired,
  translations: PropTypes.object.isRequired,
}
const propTypes = {
  capitalize: PropTypes.bool,
  fallback: PropTypes.string,
  fallbackLanguage: PropTypes.string,
  params: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  textKey: PropTypes.string,
  textKeys: PropTypes.arrayOf(PropTypes.string),
}
const defaultProps = {
  capitalize: false,
  fallback: undefined,
  fallbackLanguage: undefined,

  params: null,
  textKey: '',
  textKeys: [],
}

const Translate = (
  { capitalize, fallback, fallbackLanguage, params, textKey, textKeys },
  { language, markdown, translations }
) => {
  const markdownOutput = getTranslationByPath(markdown, {
    fallbackLanguage,
    language,
    textKey,
    textKeys,
  })

  if (
    markdownOutput &&
    !outputIsATextKey({ output: markdownOutput, textKey, textKeys })
  ) {
    return <div dangerouslySetInnerHTML={{ __html: markdownOutput }} /> // eslint-disable-line react/no-danger
  }

  const translation = getTranslationByPath(translations, {
    language,
    params,
    textKey,
    textKeys,
  })

  const output =
    capitalize && translation ? capitalizeFirstLetter(translation) : translation

  if (!output || outputIsATextKey({ output, textKey, textKeys })) {
    console.warn(`Translation not found for path: ${textKey}`, translations) // eslint-disable-line no-console
  }

  if (outputIsATextKey({ output, textKey, textKeys }) && fallback) {
    return <span>{fallback}</span>
  }

  return <span>{output || textKey}</span>
}

Translate.contextTypes = contextTypes
Translate.propTypes = propTypes
Translate.defaultProps = defaultProps

export default Translate
