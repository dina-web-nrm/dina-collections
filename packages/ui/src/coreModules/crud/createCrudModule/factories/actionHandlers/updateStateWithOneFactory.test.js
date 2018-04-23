import deepFreeze from 'deep-freeze'
import updateStateWithOneFactory from './updateStateWithOneFactory'

describe('coreModules/crud/createCrudModule/factories/actionHandlers/updateStateWithOneFactory', () => {
  describe('factory', () => {
    it('is a function', () => {
      expect.assertions(1)
      expect(typeof updateStateWithOneFactory).toBe('function')
    })
    it('creates a function', () => {
      expect.assertions(1)
      const updateStateWithMany = updateStateWithOneFactory()
      expect(typeof updateStateWithMany).toBe('function')
    })
  })
  describe('updateStateWithOne', () => {
    let updateStateWithOne
    beforeAll(() => {
      updateStateWithOne = updateStateWithOneFactory()
    })
    it('return state if action not provided', () => {
      expect.assertions(1)
      const state = { items: {} }
      const action = undefined
      expect(updateStateWithOne(state, action)).toBe(state)
    })
    it('return state if action.payload not provided', () => {
      expect.assertions(1)
      const state = { items: {} }
      const action = { meta: 123 }
      expect(updateStateWithOne(state, action)).toBe(state)
    })

    describe('e2e', () => {
      it('returns new, updated state object', () => {
        const state = { items: { '1': { id: '1' } } }
        deepFreeze(state)

        const id = '2'
        const relationships = null
        const action = {
          payload: {
            firstName: 'Ada',
            id,
            lastName: 'Lovelace',
            relationships,
            type: 'scientist',
          },
        }

        const testValue = updateStateWithOne(state, action)
        const expectedResult = {
          items: {
            '1': { id: '1' },
            '2': {
              firstName: 'Ada',
              id,
              lastName: 'Lovelace',
              relationships,
              type: 'scientist',
            },
          },
        }

        expect(testValue).toEqual(expectedResult)
      })
      it('does shallow merge of new and old items', () => {
        const state = {
          items: {
            '1': {
              children: ['2', '3'],
              group: 'oldGroup',
              id: '1',
            },
          },
        }
        deepFreeze(state)

        const action = {
          payload: {
            group: 'newGroup',
            id: '1',
            somethingNew: { awesome: 'yes' },
          },
        }

        const testValue = updateStateWithOne(state, action)
        const expectedResult = {
          items: {
            '1': {
              children: ['2', '3'],
              group: 'newGroup',
              id: '1',
              somethingNew: { awesome: 'yes' },
            },
          },
        }

        expect(testValue).toEqual(expectedResult)
      })
      it('sets new items for no initial state', () => {
        const state = { items: {} }
        const action = {
          payload: {
            group: 'newGroup',
            id: '1',
            somethingNew: { awesome: 'yes' },
          },
        }

        const testValue = updateStateWithOne(state, action)
        const expectedResult = {
          items: {
            '1': {
              group: 'newGroup',
              id: '1',
              somethingNew: { awesome: 'yes' },
            },
          },
        }

        expect(testValue).toEqual(expectedResult)
      })
    })
  })
})
