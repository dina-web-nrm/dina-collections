import deepFreeze from 'deep-freeze'

import { getLocalState, getShowInfo } from './selectors'

describe('coreModules/keyboardShortcuts/selectors', () => {
  describe('getLocalState', () => {
    it('returns local state', () => {
      const localState = {
        layer: '',
        shortcuts: {},
        showInfo: false,
      }
      deepFreeze(localState)
      const globalState = {
        keyboardShortcuts: localState,
      }
      deepFreeze(globalState)
      const testValue = getLocalState(globalState)
      const result = localState

      expect(testValue).toEqual(result)
    })
  })
  describe('getShowInfo', () => {
    it('returns true when showInfo: true', () => {
      const localState = {
        layer: '',
        shortcuts: {},
        showInfo: true,
      }
      deepFreeze(localState)

      const testValue = getShowInfo(localState)
      expect(testValue).toEqual(true)
    })
    it('returns false when showInfo: true', () => {
      const localState = {
        layer: '',
        shortcuts: {},
        showInfo: false,
      }
      deepFreeze(localState)

      const testValue = getShowInfo(localState)
      expect(testValue).toEqual(false)
    })
  })
})
