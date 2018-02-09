import configureStore from 'redux-mock-store'
import UNKNOWN_ACTION from 'utilities/test/unknownActionType'
import {
  action as mockAction,
  actionCreator as mockActionCreator,
} from 'utilities/test/mockAction'

import middleware, { dep } from './middleware'
import { KEYBOARD_SHORTCUTS_TRIGGER } from './actionTypes'
import { displayShortcuts as displayShortcutsShortcut } from './shortcuts'

describe('coreModules/keyboardShortcuts/middleware', () => {
  beforeEach(() => {
    dep.freeze()
  })
  afterEach(() => {
    dep.reset()
  })
  describe(`Action: ${UNKNOWN_ACTION}`, () => {
    it('returns same state', () => {
      const middlewares = [middleware()]

      const store = configureStore(middlewares)()
      const action = { type: UNKNOWN_ACTION }

      store.dispatch(action)
      expect(store.getActions()).toEqual([action])
    })
  })
  describe(`Action: ${KEYBOARD_SHORTCUTS_TRIGGER}`, () => {
    beforeEach(() => {
      dep.mock({
        toggleShortcutsModal: mockActionCreator,
      })
    })
    it('dispatch toggleShortcutsModal if payload contain displayShortcutsShortcut code', () => {
      const middlewares = [middleware()]

      const store = configureStore(middlewares)()
      const action = {
        payload: {
          code: displayShortcutsShortcut.code,
        },
        type: KEYBOARD_SHORTCUTS_TRIGGER,
      }

      store.dispatch(action)
      expect(store.getActions()).toEqual([action, mockAction])
    })
    it('dont dispatch toggleShortcutsModal if payload dont contain displayShortcutsShortcut code', () => {
      const middlewares = [middleware()]

      const store = configureStore(middlewares)()
      const action = {
        payload: {
          code: 'unknown-code',
        },
        type: KEYBOARD_SHORTCUTS_TRIGGER,
      }

      store.dispatch(action)
      expect(store.getActions()).toEqual([action])
    })
  })
})
