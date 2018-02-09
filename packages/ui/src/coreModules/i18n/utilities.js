import { createGetter } from '../../utilities/stateHelper'

const interpolationRegex = /\{\{([a-zA-Z0-9_-]+)}}/g

export const format = (string, params = {}) => {
  let resultString = string
  const stringParameters = resultString.match(interpolationRegex)
  if (!stringParameters) {
    return string
  }
  stringParameters.forEach(stringParameter => {
    const cleanParameter = stringParameter.replace(/[{}]/g, '')
    if (params[cleanParameter] !== undefined) {
      resultString = resultString.replace(
        `${stringParameter}`,
        params[cleanParameter].toString()
      )
    }
  })
  return resultString
}

export const translationByPathGetter = createGetter([':textKey', ':language'])

export const getTranslationByPath = (
  translations,
  {
    fallbackLanguage,
    language,
    params,
    textKey: inputTextKey,
    textKeys: inputTextKeys,
  }
) => {
  const textKeys = (inputTextKeys && inputTextKeys.length && inputTextKeys) || [
    inputTextKey,
  ]

  let translation = textKeys.reduce((foundTranslation, textKey) => {
    if (foundTranslation) {
      return foundTranslation
    }
    return translationByPathGetter(translations, {
      language,
      textKey,
    })
  }, '')

  const fallbackTranslation = textKeys.join(', ')

  if (!translation && fallbackLanguage) {
    /* eslint-disable no-console */
    console.warn(
      `Translation for key ${fallbackTranslation} language ${
        language
      } not found trying fallback language ${fallbackLanguage}`
    )
    /* eslint-enable no-console */
    return getTranslationByPath(translations, {
      language: fallbackLanguage,
      params,
      textKey: inputTextKey,
      textKeys: inputTextKeys,
    })
  }

  translation = translation || fallbackTranslation

  return params && translation ? format(translation, params) : translation
}

export const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const buildModuleTextKey = ({ module, scope, textKey }) => {
  if (!scope) {
    return `modules.${module}.${textKey}`
  }
  return `modules.${module}.${scope}.${textKey}`
}

export const buildTextKeys = ({ modules, scope, textKey }) => {
  return modules.reduce((textKeys, module) => {
    if (scope) {
      textKeys.push(
        buildModuleTextKey({
          module,
          scope,
          textKey,
        })
      )
    }
    textKeys.push(
      buildModuleTextKey({
        module,
        textKey,
      })
    )
    return textKeys
  }, [])
}

export const asyncImportRenderer = () => {
  return import('utilities/markdown/renderMarkdownToHtml.js')
}

export const markdownToHtmlAsync = markdown => {
  return asyncImportRenderer().then(renderer => {
    return renderer(markdown)
  })
}

export const outputIsATextKey = ({ output, textKey, textKeys }) => {
  return !!(
    output === textKey ||
    // enough to check the first entry in textKeys
    (output && textKeys && textKeys[0] && output.indexOf(textKeys[0]) > -1)
  )
}
