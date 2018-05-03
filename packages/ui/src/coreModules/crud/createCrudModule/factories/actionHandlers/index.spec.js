import createActionHandlers, { dep } from './index'

describe('coreModules/crud/createCrudModule/factories/actionHandlers', () => {
  it('is a function', () => {
    expect.assertions(1)
    expect(typeof createActionHandlers).toBe('function')
  })
  it('throws error ir resource not provided', () => {
    expect.assertions(1)

    expect(() => {
      createActionHandlers({})
    }).toThrow()
  })
  it('return empty object if no operations provided', () => {
    expect.assertions(1)

    const resourceSpecification = {
      resource: 'physicalObject',
    }

    expect(createActionHandlers({ resourceSpecification })).toEqual({})
  })

  describe('with dependor', () => {
    let updateStateWithManyFactoryMock
    let updateStateWithOneFactoryMock
    beforeEach(() => {
      updateStateWithManyFactoryMock = jest.fn()
      updateStateWithOneFactoryMock = jest.fn()
      dep.freeze()
      dep.mock({
        updateStateWithManyFactory: input => {
          updateStateWithManyFactoryMock(input)
          return input
        },
        updateStateWithOneFactory: input => {
          updateStateWithOneFactoryMock(input)
          return input
        },
      })
    })
    afterAll(() => {
      dep.reset()
    })
    it('throw error if operationType is unknown', () => {
      expect.assertions(1)

      const input = {
        resourceSpecification: {
          operations: [
            {
              operationId: 'physicalObjectGetOne',
              type: 'getOne',
            },
            {
              operationId: 'physicalObjectCreate',
              type: 'slice',
            },
          ],
          resource: 'physicalObject',
        },
      }
      expect(() => {
        createActionHandlers(input)
      }).toThrow()
    })
    it('throw error if operationType resourceActionTypes incorrect', () => {
      expect.assertions(1)

      const input = {
        resourceSpecification: {
          operations: [
            {
              operationId: 'physicalObjectGetOne',
              type: 'getOne',
            },
          ],
          resource: 'physicalObject',
        },
      }
      expect(() => {
        createActionHandlers(input)
      }).toThrow()
    })
    it('call correct updateStateFactory depending on type', () => {
      expect.assertions(2)

      const input = {
        resourceActionTypes: {
          create: {
            fail: 'CREATE_PHYSICAL_OBJECT_FAIL',
            request: 'CREATE_PHYSICAL_OBJECT_REQUEST',
            success: 'CREATE_PHYSICAL_OBJECT_SUCCESS',
          },
          getMany: {
            fail: 'GET_MANY_PHYSICAL_OBJECT_FAIL',
            request: 'GET_MANY_PHYSICAL_OBJECT_REQUEST',
            success: 'GET_MANY_PHYSICAL_OBJECT_SUCCESS',
          },
          getOne: {
            fail: 'GET_ONE_PHYSICAL_OBJECT_FAIL',
            request: 'GET_ONE_PHYSICAL_OBJECT_REQUEST',
            success: 'GET_ONE_PHYSICAL_OBJECT_SUCCESS',
          },
        },
        resourceSpecification: {
          operations: [
            {
              operationId: 'physicalObjectGetOne',
              type: 'getOne',
            },
            {
              operationId: 'physicalObjectCreate',
              type: 'create',
            },
            {
              operationId: 'physicalObjectGetMany',
              type: 'getMany',
            },
          ],
          resource: 'physicalObject',
        },
      }
      createActionHandlers(input)
      expect(updateStateWithManyFactoryMock.mock.calls.length).toEqual(1)
      expect(updateStateWithOneFactoryMock.mock.calls.length).toEqual(2)
    })
    it('call updateStateFactory with correct input', () => {
      expect.assertions(1)

      const input = {
        resourceActionTypes: {
          create: {
            fail: 'CREATE_PHYSICAL_OBJECT_FAIL',
            request: 'CREATE_PHYSICAL_OBJECT_REQUEST',
            success: 'CREATE_PHYSICAL_OBJECT_SUCCESS',
          },
        },
        resourceSpecification: {
          operations: [
            {
              operationId: 'physicalObjectCreate',
              type: 'create',
            },
          ],
          resource: 'physicalObject',
        },
      }
      createActionHandlers(input)
      expect(updateStateWithOneFactoryMock.mock.calls[0][0]).toEqual({
        operationType: 'create',
        resource: 'physicalObject',
        resourceActionTypes: {
          create: {
            fail: 'CREATE_PHYSICAL_OBJECT_FAIL',
            request: 'CREATE_PHYSICAL_OBJECT_REQUEST',
            success: 'CREATE_PHYSICAL_OBJECT_SUCCESS',
          },
        },
      })
    })
  })
  describe('e2e', () => {
    it('returns actionHandlers scoped under action', () => {
      expect.assertions(3)

      const input = {
        resourceActionTypes: {
          create: {
            fail: 'CREATE_PHYSICAL_OBJECT_FAIL',
            request: 'CREATE_PHYSICAL_OBJECT_REQUEST',
            success: 'CREATE_PHYSICAL_OBJECT_SUCCESS',
          },
          getMany: {
            fail: 'GET_MANY_PHYSICAL_OBJECT_FAIL',
            request: 'GET_MANY_PHYSICAL_OBJECT_REQUEST',
            success: 'GET_MANY_PHYSICAL_OBJECT_SUCCESS',
          },
          getOne: {
            fail: 'GET_ONE_PHYSICAL_OBJECT_FAIL',
            request: 'GET_ONE_PHYSICAL_OBJECT_REQUEST',
            success: 'GET_ONE_PHYSICAL_OBJECT_SUCCESS',
          },
        },
        resourceSpecification: {
          operations: [
            {
              operationId: 'physicalObjectGetOne',
              type: 'getOne',
            },
            {
              operationId: 'physicalObjectCreate',
              type: 'create',
            },
            {
              operationId: 'physicalObjectGetMany',
              type: 'getMany',
            },
          ],
          resource: 'physicalObject',
        },
      }
      const actionHandlers = createActionHandlers(input)

      expect(typeof actionHandlers.CREATE_PHYSICAL_OBJECT_SUCCESS).toEqual(
        'function'
      )
      expect(typeof actionHandlers.GET_ONE_PHYSICAL_OBJECT_SUCCESS).toEqual(
        'function'
      )
      expect(typeof actionHandlers.GET_MANY_PHYSICAL_OBJECT_SUCCESS).toEqual(
        'function'
      )
    })
  })
})
