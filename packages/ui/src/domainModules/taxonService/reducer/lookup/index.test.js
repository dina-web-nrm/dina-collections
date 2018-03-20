import UNKNOWN_ACTION from 'utilities/test/unknownActionType'

import reducer, { getInitialState } from './index'

const tryImport = () => {
  return import('./index')
}

describe('domainModules/taxonService/reducer/lookup', () => {
  describe('getInitialState', () => {
    it('returns initialState', () => {
      const testValue = getInitialState()
      const expectedResult = {
        error: null,
        loading: false,
        result: [],
        searchFilterName: null,
      }

      expect(testValue).toEqual(expectedResult)
    })

    it('returns new state object every time', () => {
      const testValue1 = getInitialState()
      const testValue2 = getInitialState()

      expect(testValue1).not.toBe(testValue2)
    })
  })

  describe('reducer', () => {
    it('imports without error', () => {
      expect.assertions(1)
      return expect(tryImport()).resolves.toBeTruthy()
    })

    it('returns initial state', () => {
      const testValue = reducer(undefined, { type: UNKNOWN_ACTION })
      const expectedResult = getInitialState()

      expect(testValue).toEqual(expectedResult)
    })
  })
})
