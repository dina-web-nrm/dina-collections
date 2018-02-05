import deepFreeze from 'deep-freeze'

import reducer from './reducer'

describe('$1/reducer', () => {
  describe('no case', () => {
    it('returns initial state', () => {
      const testValue = reducer(undefined, {})
      const expectedResult = {
        availableLanguages: [],
        defaultLanguage: 'en',
        language: null,
        translations: null,
      }

      expect(testValue).toEqual(expectedResult)
    })
    it('returns same state for unrecognised action', () => {
      const state = {
        something: 123,
      }
      deepFreeze(state)
      const testValue = reducer(state, {})

      expect(testValue).toBe(state)
      expect(testValue).toEqual(state)
    })
  })
})
