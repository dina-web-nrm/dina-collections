import objectPath from 'object-path'

export const getLocalState = state => {
  return state.i18n
}

export const getAvailableLanguages = state => {
  return state.availableLanguages
}

export const getLanguage = state => {
  return state.language
}

export const getMarkdown = state => {
  return state.markdown
}

export const getMarkdownModules = state => {
  const markdown = getMarkdown(state)
  return markdown && markdown.modules
}

export const getMarkdownKeysByPath = (state, path) => {
  const modules = getMarkdownModules(state)

  return Object.keys(objectPath.get(modules, path) || {})
}

export const getTranslations = state => {
  return state.translations
}

export const getTranslationsModules = state => {
  const translations = getTranslations(state)
  return translations && translations.modules
}
