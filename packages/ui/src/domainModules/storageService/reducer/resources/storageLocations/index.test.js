import deepFreeze from 'deep-freeze'

import UNKNOWN_ACTION from 'utilities/test/unknownActionType'

import {
  STORAGE_SERVICE_CREATE_STORAGE_LOCATION_SUCCESS,
  STORAGE_SERVICE_GET_STORAGE_LOCATION_SUCCESS,
  STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_SUCCESS,
} from '../../../actionTypes'

import reducer, { getInitialState } from './index'

const tryImport = () => {
  return import('./index')
}

const getStorageLocationPayload = () => {
  return {
    attributes: {
      locationText: 'string',
    },
    id: 'a73jhdc62sdgs5x4dsh2',
    relationships: {},
    type: 'type',
  }
}

describe('domainModules/storageService/reducer/resources/storageLocations', () => {
  describe('getInitialState', () => {
    it('returns empty object', () => {
      const testValue = getInitialState()
      const expectedResult = {}

      expect(testValue).toEqual(expectedResult)
    })

    it('returns new empty object every time', () => {
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

    const createAndGetSuccessTypes = [
      STORAGE_SERVICE_CREATE_STORAGE_LOCATION_SUCCESS,
      STORAGE_SERVICE_GET_STORAGE_LOCATION_SUCCESS,
    ]

    createAndGetSuccessTypes.forEach(actionType => {
      it(`sets new resource in state from initial empty state on ${
        actionType
      }`, () => {
        const payload = getStorageLocationPayload()
        const { id, relationships, ...attributes } = payload
        const action = {
          payload,
          type: actionType,
        }

        const testValue = reducer(undefined, action)
        const expectedResult = {
          [id]: {
            ...attributes,
            id,
            relationships,
          },
        }

        expect(testValue).toEqual(expectedResult)
      })
    })

    createAndGetSuccessTypes.forEach(actionType => {
      it(`sets new resource when keeping other resources on ${
        actionType
      }`, () => {
        const state = {
          goog: {
            id: 'goog',
            name: 'Google Inc.',
            type: 'type',
          },
        }
        deepFreeze(state)

        const payload = getStorageLocationPayload()
        const { id, relationships, ...attributes } = payload
        const action = {
          payload,
          type: actionType,
        }

        const testValue = reducer(state, action)
        const expectedResult = {
          ...state,
          [id]: {
            ...attributes,
            id,
            relationships,
          },
        }

        expect(testValue).toEqual(expectedResult)
      })
    })

    it(`updates existing resource when keeping other resources on ${
      STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_SUCCESS
    }`, () => {
      const state = {
        appl: {
          id: 'appl',
          name: 'Apple Inc.',
          type: 'type',
        },
        goog: {
          id: 'goog',
          name: 'Google Inc.',
          type: 'type',
        },
      }
      deepFreeze(state)

      // changed name
      const action = {
        payload: {
          id: 'goog',
          name: 'Alphabet Inc.',
          type: 'type',
        },
        type: STORAGE_SERVICE_UPDATE_STORAGE_LOCATION_SUCCESS,
      }
      const { id, relationships, ...attributes } = action.payload

      const testValue = reducer(state, action)
      const expectedResult = {
        ...state,
        [id]: {
          ...attributes,
          id,
          relationships,
        },
      }

      expect(testValue).toEqual(expectedResult)
    })
  })
})
