import React from 'react'
import PropTypes from 'prop-types'

import { getTranslationByPath } from '../utilities'

const contextTypes = {
  language: PropTypes.string.isRequired,
  markdown: PropTypes.object.isRequired,
}

const propTypes = {
  fallbackLanguage: PropTypes.string,
  textKey: PropTypes.string,
  textKeys: PropTypes.arrayOf(PropTypes.string),
}
const defaultProps = {
  fallbackLanguage: undefined,
  textKey: '',
  textKeys: [],
}

const Markdown = (
  { textKey, textKeys, fallbackLanguage },
  { language, markdown }
) => {
  const output = getTranslationByPath(markdown, {
    fallbackLanguage,
    language,
    textKey,
    textKeys,
  })
  if (!output || output === textKey) {
    console.warn(`Translation not found for path: ${textKey}`, markdown) // eslint-disable-line no-console
  }

  return <div dangerouslySetInnerHTML={{ __html: output }} /> // eslint-disable-line react/no-danger
}

Markdown.contextTypes = contextTypes
Markdown.propTypes = propTypes
Markdown.defaultProps = defaultProps

export default Markdown
