import deepFreeze from 'deep-freeze'

import UNKNOWN_ACTION from 'utilities/test/unknownActionType'
import actionTypes from 'coreModules/crud/actionTypes'

import { TAXON_SERVICE_UPDATE_SEARCH_QUERY } from '../../actionTypes'

import reducer, { getInitialState } from './index'

const {
  taxonName: {
    getMany: {
      fail: TAXON_SERVICE_GET_TAXON_NAMES_FAIL,
      request: TAXON_SERVICE_GET_TAXON_NAMES_REQUEST,
      success: TAXON_SERVICE_GET_TAXON_NAMES_SUCCESS,
    },
  },
} = actionTypes

const tryImport = () => {
  return import('./index')
}

describe('domainModules/taxon/reducer/lookup', () => {
  describe('getInitialState', () => {
    it('returns initialState', () => {
      const testValue = getInitialState()
      const expectedResult = {
        error: null,
        loading: false,
        result: [],
        searchQueries: {},
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

    describe(TAXON_SERVICE_GET_TAXON_NAMES_FAIL, () => {
      it('sets loading false and clears result', () => {
        const state = {
          error: null,
          loading: true,
          result: [{ old: 'result' }],
        }
        deepFreeze(state)
        const action = {
          error: true,
          meta: { isLookup: true },
          payload: { status: 404 },
          type: TAXON_SERVICE_GET_TAXON_NAMES_FAIL,
        }
        const expectedState = {
          error: { status: 404 },
          loading: false,
          result: [],
        }

        expect(reducer(state, action)).toEqual(expectedState)
      })
    })
    describe(TAXON_SERVICE_GET_TAXON_NAMES_REQUEST, () => {
      it('sets loading true', () => {
        const state = {
          loading: false,
        }
        deepFreeze(state)
        const action = {
          meta: { isLookup: true },
          type: TAXON_SERVICE_GET_TAXON_NAMES_REQUEST,
        }
        const expectedState = {
          loading: true,
        }

        expect(reducer(state, action)).toEqual(expectedState)
      })
    })
    describe(TAXON_SERVICE_GET_TAXON_NAMES_SUCCESS, () => {
      it('sets loading false and sets result and clears error', () => {
        const state = {
          error: { status: 404 },
          loading: true,
          result: [],
        }
        deepFreeze(state)
        const action = {
          meta: { isLookup: true },
          payload: [{ some: 'result' }],
          type: TAXON_SERVICE_GET_TAXON_NAMES_SUCCESS,
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
          searchQueries: {},
        }
        deepFreeze(state)
        const action = {
          meta: { inputName: 'taxon.1' },
          payload: 'mouse',
          type: TAXON_SERVICE_UPDATE_SEARCH_QUERY,
        }
        const expectedState = {
          searchQueries: { 'taxon.1': 'mouse' },
        }

        expect(reducer(state, action)).toEqual(expectedState)
      })
    })
  })
})
