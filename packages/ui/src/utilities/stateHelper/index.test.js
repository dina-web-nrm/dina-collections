import deepFreeze from 'deep-freeze'

import { immutableReplace } from './index'

describe('utilities/stateHelper', () => {
  describe('immutableReplace', () => {
    it('returns new object with value at oldPath set on newPath and oldPath removed', () => {
      const oldPath = 'data_attribute'
      const newPath = 'dataAttribute'
      const value = 'someValue'

      const initial = {
        [oldPath]: value,
      }
      deepFreeze(initial)

      const testValue = immutableReplace(initial, { newPath, oldPath })

      const expectedResult = {
        [newPath]: value,
      }

      expect(testValue).toEqual(expectedResult)
    })
  })
})
