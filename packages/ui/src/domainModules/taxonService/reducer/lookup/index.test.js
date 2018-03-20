import deepFreeze from 'deep-freeze'

import UNKNOWN_ACTION from 'utilities/test/unknownActionType'

import reducer, { getInitialState } from './index'

import {
  TAXON_SERVICE_CLEAR_SEARCH_QUERY,
  TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_FAIL,
  TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_REQUEST,
  TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_SUCCESS,
  TAXON_SERVICE_UPDATE_SEARCH_QUERY,
} from '../../actionTypes'

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
        searchQuery: null,
      }

      expect(testValue).toEqual(expectedResult)
    })

    it('returns new statep object every time', () => {
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

    describe(TAXON_SERVICE_CLEAR_SEARCH_QUERY, () => {
      it('clears searchQuery', () => {
        const state = {
          result: [{ old: 'result' }],
          searchQuery: 'bat',
        }
        deepFreeze(state)
        const action = {
          type: TAXON_SERVICE_CLEAR_SEARCH_QUERY,
        }
        const expectedState = {
          result: [],
          searchQuery: null,
        }

        expect(reducer(state, action)).toEqual(expectedState)
      })
    })
    describe(TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_FAIL, () => {
      it('sets loading false and clears result', () => {
        const state = {
          error: null,
          loading: true,
          result: [{ old: 'result' }],
        }
        deepFreeze(state)
        const action = {
          error: true,
          payload: { status: 404 },
          type: TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_FAIL,
        }
        const expectedState = {
          error: { status: 404 },
          loading: false,
          result: [],
        }

        expect(reducer(state, action)).toEqual(expectedState)
      })
    })
    describe(TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_REQUEST, () => {
      it('sets loading true', () => {
        const state = {
          loading: false,
        }
        deepFreeze(state)
        const action = {
          type: TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_REQUEST,
        }
        const expectedState = {
          loading: true,
        }

        expect(reducer(state, action)).toEqual(expectedState)
      })
    })
    describe(TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_SUCCESS, () => {
      it('sets loading false and sets result and clears error', () => {
        const state = {
          error: { status: 404 },
          loading: true,
          result: [],
        }
        deepFreeze(state)
        const action = {
          payload: [{ some: 'result' }],
          type: TAXON_SERVICE_GET_TAXA_FOR_LOOKUP_SUCCESS,
        }
        const expectedState = {
          error: null,
          loading: false,
          result: [{ some: 'result' }],
        }

        expect(reducer(state, action)).toEqual(expectedState)
      })
    })
    describe(TAXON_SERVICE_UPDATE_SEARCH_QUERY, () => {
      it('updates searchQuery', () => {
        const state = {
          searchQuery: null,
        }
        deepFreeze(state)
        const action = {
          payload: 'mouse',
          type: TAXON_SERVICE_UPDATE_SEARCH_QUERY,
        }
        const expectedState = {
          searchQuery: 'mouse',
        }

        expect(reducer(state, action)).toEqual(expectedState)
      })
    })
  })
})
