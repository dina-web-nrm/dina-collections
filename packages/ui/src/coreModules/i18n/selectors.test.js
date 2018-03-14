import deepFreeze from 'deep-freeze'

import {
  getAvailableLanguages,
  getDefaultLanguage,
  getLanguage,
  getLocalState,
  getMarkdown,
  getTranslations,
} from './selectors'

describe('i18n/selectors', () => {
  describe('getLocalState', () => {
    it('returns local state', () => {
      const localState = { activeLanguage: 'en' }
      deepFreeze(localState)
      const globalState = {
        i18n: localState,
      }
      deepFreeze(globalState)
      const testValue = getLocalState(globalState)
      const result = localState

      expect(testValue).toEqual(result)
    })
  })
  describe('getAvailableLanguages', () => {
    it('returns availableLanguages', () => {
      const availableLanguages = ['en', 'sv']
      const state = {
        availableLanguages,
      }
      deepFreeze(state)
      const testValue = getAvailableLanguages(state)
      const result = availableLanguages

      expect(testValue).toEqual(result)
    })
  })
  describe('getLanguage', () => {
    it('returns language', () => {
      const language = 'en'
      const state = {
        language,
      }
      deepFreeze(state)
      const testValue = getLanguage(state)
      const result = language

      expect(testValue).toEqual(result)
    })
  })
  describe('getDefaultLanguage', () => {
    it('returns defaultLanguage', () => {
      const defaultLanguage = 'en'
      const state = {
        defaultLanguage,
      }
      deepFreeze(state)
      const testValue = getDefaultLanguage(state)
      const result = defaultLanguage

      expect(testValue).toEqual(result)
    })
  })
  describe('getMarkdown', () => {
    it('returns markdown', () => {
      const markdown = { keys: { values: {} } }
      const state = {
        markdown,
      }
      deepFreeze(state)
      const testValue = getMarkdown(state)
      const result = markdown

      expect(testValue).toEqual(result)
    })
  })
  describe('getTranslations', () => {
    it('returns translations', () => {
      const translations = { keys: { values: {} } }
      const state = {
        translations,
      }
      deepFreeze(state)
      const testValue = getTranslations(state)
      const result = translations

      expect(testValue).toEqual(result)
    })
  })
})
