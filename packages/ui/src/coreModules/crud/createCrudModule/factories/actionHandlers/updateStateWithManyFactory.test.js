import deepFreeze from 'deep-freeze'
import updateStateWithManyFactory, { dep } from './updateStateWithManyFactory'

describe('coreModules/crud/createCrudModule/factories/actionHandlers/updateStateWithManyFactory', () => {
  describe('factory', () => {
    it('is a function', () => {
      expect.assertions(1)
      expect(typeof updateStateWithManyFactory).toBe('function')
    })
    it('creates a function', () => {
      expect.assertions(1)
      const updateStateWithMany = updateStateWithManyFactory()
      expect(typeof updateStateWithMany).toBe('function')
    })
  })
  describe('updateStateWithMany', () => {
    let updateStateWithMany
    beforeAll(() => {
      updateStateWithMany = updateStateWithManyFactory()
    })
    it('return state if action not provided', () => {
      expect.assertions(1)
      const state = { items: {} }
      const action = undefined
      expect(updateStateWithMany(state, action)).toBe(state)
    })
    it('return state if action.payload not provided', () => {
      expect.assertions(1)
      const state = { items: {} }
      const action = { meta: 123 }
      expect(updateStateWithMany(state, action)).toBe(state)
    })
    it('return state if action.payload is not array', () => {
      expect.assertions(1)
      const state = { items: {} }
      const action = { payload: { a: 2 } }
      expect(updateStateWithMany(state, action)).toBe(state)
    })
    describe('with dependor', () => {
      let assignMock
      let createItemUpdatePathMock
      beforeEach(() => {
        assignMock = jest.fn()
        createItemUpdatePathMock = jest.fn()
        dep.freeze()
        dep.mock({
          assign: (...input) => {
            assignMock(...input)
            return input
          },
          createItemUpdatePath: input => {
            createItemUpdatePathMock(input)
            return input
          },
        })
      })
      afterAll(() => {
        dep.reset()
      })
      it('call createItemUpdatePath and assign for each item', () => {
        expect.assertions(6)
        const state = { items: { '1': 333 } }
        const action = {
          payload: [{ id: 1, number: 1 }, { id: 2, number: 2 }, { number: 3 }],
        }

        updateStateWithMany(state, action)

        expect(createItemUpdatePathMock.mock.calls.length).toEqual(3)
        expect(createItemUpdatePathMock.mock.calls[0][0]).toEqual({ id: 1 })
        expect(assignMock.mock.calls.length).toEqual(3)
        expect(assignMock.mock.calls[0][0]).toEqual(state)
        expect(assignMock.mock.calls[0][1]).toEqual({ id: 1 })
        expect(assignMock.mock.calls[0][2]).toEqual({ id: 1, number: 1 })
      })
    })
    describe('e2e', () => {
      it('add new payload and ignore items without id', () => {
        const state = { items: {} }
        deepFreeze(state)

        const action = {
          payload: [
            {
              firstName: 'Ada',
              lastName: 'Lovelace',
            },
            {
              firstName: 'Alan',
              id: '3',
              lastName: 'Turing',
            },
          ],
          type: 'someType',
        }

        const testValue = updateStateWithMany(state, action)
        const expectedResult = {
          items: {
            3: {
              firstName: 'Alan',
              id: '3',
              lastName: 'Turing',
            },
          },
        }

        expect(testValue).toEqual(expectedResult)
      })
      it('keeps previous properties if not overridden by new payload', () => {
        const state = {
          items: {
            1: {
              firstName: 'Hal',
              id: '1',
              lastName: '2000',
            },
          },
        }
        deepFreeze(state)

        const action = {
          payload: [
            {
              firstName: 'Ada',
              id: '2',
              lastName: 'Lovelace',
            },
            {
              firstName: 'Alan',
              id: '3',
              lastName: 'Turing',
            },
          ],
          type: 'someType',
        }

        const testValue = updateStateWithMany(state, action)
        const expectedResult = {
          items: {
            1: {
              firstName: 'Hal',
              id: '1',
              lastName: '2000',
            },
            2: {
              firstName: 'Ada',
              id: '2',
              lastName: 'Lovelace',
            },
            3: {
              firstName: 'Alan',
              id: '3',
              lastName: 'Turing',
            },
          },
        }

        expect(testValue).toEqual(expectedResult)
      })
      it('does shallow merge of new and pre-existing resources', () => {
        const state = {
          items: {
            1: {
              firstName: 'Hal', // this is a pre-existing property
              id: '1',
              lastName: '2000',
            },
          },
        }
        deepFreeze(state)

        const action = {
          payload: [
            {
              group: 'super computers', // new property
              id: '1',
              lastName: '3000', // changed lastName
            },
            {
              firstName: 'Alan',
              id: '3',
              lastName: 'Turing',
            },
          ],
          type: 'someType',
        }

        const testValue = updateStateWithMany(state, action)
        const expectedResult = {
          items: {
            1: {
              firstName: 'Hal',
              group: 'super computers',
              id: '1',
              lastName: '3000',
            },
            3: {
              firstName: 'Alan',
              id: '3',
              lastName: 'Turing',
            },
          },
        }

        expect(testValue).toEqual(expectedResult)
      })

      it('does shallow merge of relationships', () => {
        const state = {
          items: {
            1: {
              firstName: 'Hal', // this is a pre-existing property
              id: '1',
              lastName: '2000',
              relationships: {
                project: {
                  data: {
                    id: 123,
                    type: 'project',
                  },
                },
              },
            },
          },
        }
        deepFreeze(state)

        const action = {
          payload: [
            {
              id: '1',
              relationships: {
                hobbies: {
                  data: [
                    {
                      id: 123,
                      type: 'hobby',
                    },
                  ],
                },
              },
            },
          ],
          type: 'someType',
        }

        const testValue = updateStateWithMany(state, action)
        const expectedResult = {
          items: {
            1: {
              firstName: 'Hal',
              id: '1',
              lastName: '2000',
              relationships: {
                hobbies: {
                  data: [
                    {
                      id: 123,
                      type: 'hobby',
                    },
                  ],
                },
                project: {
                  data: {
                    id: 123,
                    type: 'project',
                  },
                },
              },
            },
          },
        }

        expect(testValue).toEqual(expectedResult)
      })
    })
  })
})
