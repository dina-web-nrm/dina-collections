import deepFreeze from 'deep-freeze'
import UNKNOWN_ACTION from 'utilities/test/unknownActionType'

import reducer from './reducer'
import {
  KEYBOARD_SHORTCUTS_SET_MODAL_VISIBLE,
  KEYBOARD_SHORTCUTS_SET_MODAL_HIDDEN,
} from './actionTypes'

describe('coreModules/keyboardShortcuts', () => {
  describe('No action', () => {
    it('returns initial state', () => {
      const testValue = reducer(undefined, {})
      const expectedResult = {
        shortcuts: {},
        showInfo: false,
      }

      expect(testValue).toEqual(expectedResult)
    })
  })
  describe(`Action: ${UNKNOWN_ACTION}`, () => {
    it(`returns same state for`, () => {
      const state = {
        shortcuts: {},
      }
      deepFreeze(state)
      const testValue = reducer(state, {})

      expect(testValue).toBe(state)
      expect(testValue).toEqual(state)
    })
  })
  describe(`Action: ${KEYBOARD_SHORTCUTS_SET_MODAL_VISIBLE}`, () => {
    it('set showInfo to true when no state', () => {
      const action = {
        type: KEYBOARD_SHORTCUTS_SET_MODAL_VISIBLE,
      }
      const expectedResult = {
        shortcuts: {},
        showInfo: true,
      }
      const testValue = reducer(undefined, action)
      expect(testValue).toEqual(expectedResult)
    })
    it('set showInfo to true when state', () => {
      const state = {
        shortcuts: {
          a: 123,
        },
      }

      const action = {
        type: KEYBOARD_SHORTCUTS_SET_MODAL_VISIBLE,
      }

      const expectedResult = {
        shortcuts: {
          a: 123,
        },
        showInfo: true,
      }

      deepFreeze(state)
      const testValue = reducer(state, action)

      expect(testValue).toEqual(expectedResult)
    })
  })
  describe(`Action: ${KEYBOARD_SHORTCUTS_SET_MODAL_HIDDEN}`, () => {
    it('set showInfo to false when no state', () => {
      const action = {
        type: KEYBOARD_SHORTCUTS_SET_MODAL_HIDDEN,
      }
      const expectedResult = {
        shortcuts: {},
        showInfo: false,
      }
      const testValue = reducer(undefined, action)
      expect(testValue).toEqual(expectedResult)
    })
    it('set showInfo to false when state', () => {
      const state = {
        shortcuts: {
          a: 123,
        },
      }

      const action = {
        type: KEYBOARD_SHORTCUTS_SET_MODAL_HIDDEN,
      }

      const expectedResult = {
        shortcuts: {
          a: 123,
        },
        showInfo: false,
      }

      deepFreeze(state)
      const testValue = reducer(state, action)

      expect(testValue).toEqual(expectedResult)
    })
  })
})
