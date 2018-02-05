import deepFreeze from 'deep-freeze'

import { BOOTSTRAP_UNREGISTER_MODULES } from 'coreModules/bootstrap/actionTypes'

import { I18N_SET_LANGUAGE } from './actionTypes'

import reducer, { initialState } from './reducer'

describe('i18n/reducer', () => {
  describe('no case', () => {
    it('returns initial state if no state provided', () => {
      const testValue = reducer(undefined, { type: '@@@test' })
      const result = {
        availableLanguages: ['en', 'sv'],
        defaultLanguage: 'en',
        language: 'en',
        markdown: {},
        translations: {},
      }

      expect(testValue).toEqual(result)
    })
    it('returns same state for unrecognised action', () => {
      const state = {
        something: 123,
      }
      deepFreeze(state)
      const testValue = reducer(state, { type: '@@@test' })

      expect(testValue).toBe(state)
      expect(testValue).toEqual(state)
    })
  })
  describe(BOOTSTRAP_UNREGISTER_MODULES, () => {
    it('removes listed modules from markdown state', () => {
      const state = {
        markdown: {
          modules: {
            i18n: {
              language: {
                en: '<p>language</p>\n',
              },
            },
            size: {
              breakpoint: {
                en: '<p>breakpoint</p>\n',
                sv: '<p>brytpunkt</p>\n',
              },
            },
            user: {
              hello: {
                en: '<h1>hello</h1>\n',
              },
            },
          },
        },
      }
      deepFreeze(state)
      const action = {
        payload: {
          modules: {
            i18n: true,
            user: true,
          },
        },
        type: BOOTSTRAP_UNREGISTER_MODULES,
      }
      const testValue = reducer(state, action)
      const expectedResult = {
        markdown: {
          modules: {
            size: {
              breakpoint: {
                en: '<p>breakpoint</p>\n',
                sv: '<p>brytpunkt</p>\n',
              },
            },
          },
        },
      }

      expect(testValue).toEqual(expectedResult)
    })
  })
  describe(BOOTSTRAP_UNREGISTER_MODULES, () => {
    it('removes listed modules from translations state', () => {
      const state = {
        translations: {
          modules: {
            i18n: {
              language: {
                en: 'language',
              },
            },
            size: {
              breakpoint: {
                en: 'breakpoint',
                sv: 'brytpunkt',
              },
            },
            user: {
              hello: {
                en: 'hello',
              },
            },
          },
        },
      }
      deepFreeze(state)
      const action = {
        payload: {
          modules: {
            size: true,
          },
        },
        type: BOOTSTRAP_UNREGISTER_MODULES,
      }
      const testValue = reducer(state, action)
      const expectedResult = {
        translations: {
          modules: {
            i18n: {
              language: {
                en: 'language',
              },
            },
            user: {
              hello: {
                en: 'hello',
              },
            },
          },
        },
      }

      expect(testValue).toEqual(expectedResult)
    })
  })
  describe(I18N_SET_LANGUAGE, () => {
    it('returns state with set language', () => {
      const state = {
        ...initialState,
        language: 'en',
      }
      deepFreeze(state)
      const action = {
        payload: 'sv',
        type: I18N_SET_LANGUAGE,
      }
      const testValue = reducer(state, action)
      const result = {
        ...state,
        language: 'sv',
      }

      expect(testValue).toEqual(result)
    })
  })
})
