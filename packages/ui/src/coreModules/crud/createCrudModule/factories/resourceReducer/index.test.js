import deepFreeze from 'deep-freeze'
import resourceReducer from './index'

describe('coreModules/crud/CrudManager/resourceReducer', () => {
  describe('factory', () => {
    it('is a function', () => {
      expect.assertions(1)
      expect(typeof resourceReducer).toBe('function')
    })
    it('return a reducer function', () => {
      expect.assertions(1)
      const reducer = resourceReducer()
      expect(typeof reducer).toBe('function')
    })
  })
  describe('reducerWithoutActionHandlers', () => {
    let reducerWithoutActionHandlers
    beforeEach(() => {
      reducerWithoutActionHandlers = resourceReducer({})
    })
    it('return initial state when no action provided', () => {
      const state = { a: 2 }
      deepFreeze(state)
      const res = reducerWithoutActionHandlers(state)
      expect(res).toBe(state)
    })
    it('return initial state when action provided', () => {
      const state = { a: 2 }
      deepFreeze(state)
      const action = {
        payload: {
          id: 22,
        },
        type: 'CREATE_PHYSICAL_OBJECT_SUCCESS',
      }
      const res = reducerWithoutActionHandlers(state, action)
      expect(res).toBe(state)
    })
  })
  describe('reducerWithActionHandlers', () => {
    let reducerWithActionHandlers
    let resourceActionHandlers
    let resourceActionHandlerMock
    beforeEach(() => {
      resourceActionHandlerMock = jest.fn()
      resourceActionHandlers = {
        CREATE_PHYSICAL_OBJECT_SUCCESS: (state, action) => {
          resourceActionHandlerMock(state, action)
          return {
            ...state,
            [action.payload.id]: action.payload,
          }
        },
      }

      reducerWithActionHandlers = resourceReducer({ resourceActionHandlers })
    })
    it('return initial state when non matching action provided', () => {
      const state = { a: 2 }
      deepFreeze(state)
      const action = {
        payload: {
          id: 22,
        },
        type: 'GET_ONE_PHYSICAL_OBJECT_SUCCESS',
      }

      const res = reducerWithActionHandlers(state, action)
      expect(res).toBe(state)
    })
    it('call actionHandler when matching action provided', () => {
      const state = { '12': { id: '12', name: 'Alan' } }
      deepFreeze(state)
      const action = {
        payload: {
          id: '22',
          name: 'Sue',
        },
        type: 'CREATE_PHYSICAL_OBJECT_SUCCESS',
      }

      const res = reducerWithActionHandlers(state, action)
      expect(res).toEqual({
        '12': { id: '12', name: 'Alan' },
        '22': { id: '22', name: 'Sue' },
      })
    })
  })
})
