import createActionCreators, { dep } from './index'

describe('coreModules/crud/createCrudModule/factories/actionCreators', () => {
  it('is a function', () => {
    expect.assertions(1)
    expect(typeof createActionCreators).toBe('function')
  })
  it('throws error ir resource not provided', () => {
    expect.assertions(1)

    expect(() => {
      createActionCreators({})
    }).toThrow()
  })
  it('return empty object if no operations provided', () => {
    expect.assertions(1)

    const resourceSpecification = {
      resource: 'physicalObject',
    }

    expect(createActionCreators({ resourceSpecification })).toEqual({})
  })

  describe('with dependor', () => {
    let createFactoryMock
    beforeEach(() => {
      createFactoryMock = jest.fn()
      dep.freeze()
      dep.mock({
        factoryMap: {
          create: input => {
            createFactoryMock(input)
            return input
          },
          getOne: input => {
            return input
          },
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
              operationId: 'getPhysicalObject',
              type: 'getOne',
            },
            {
              operationId: 'createPhysicalObject',
              type: 'slice',
            },
          ],
          resource: 'physicalObject',
        },
      }
      expect(() => {
        createActionCreators(input)
      }).toThrow()
    })
    it('call createFactory for each operation with type create', () => {
      expect.assertions(1)

      const input = {
        resourceSpecification: {
          operations: [
            {
              operationId: 'getPhysicalObject',
              type: 'getOne',
            },
            {
              operationId: 'createPhysicalObject',
              type: 'create',
            },
          ],
          resource: 'physicalObject',
        },
      }
      createActionCreators(input)
      expect(createFactoryMock.mock.calls.length).toEqual(1)
    })
    it('call createFactory with expected paramenters', () => {
      expect.assertions(1)

      const input = {
        resourceActionTypes: {
          getOne: {
            fail: 'GET_ONE_PHYSICAL_OBJECT_FAIL',
            request: 'GET_ONE_PHYSICAL_OBJECT_REQUEST',
            success: 'GET_ONE_PHYSICAL_OBJECT_SUCCESS',
          },
        },
        resourceSpecification: {
          operations: [
            {
              operationId: 'getPhysicalObject',
              type: 'getOne',
            },
            {
              operationId: 'createPhysicalObject',
              type: 'create',
            },
          ],
          resource: 'physicalObject',
        },
      }
      createActionCreators(input)
      expect(createFactoryMock.mock.calls[0][0]).toEqual({
        operationId: 'createPhysicalObject',
        operationType: 'create',
        resource: 'physicalObject',
        resourceActionTypes: {
          getOne: {
            fail: 'GET_ONE_PHYSICAL_OBJECT_FAIL',
            request: 'GET_ONE_PHYSICAL_OBJECT_REQUEST',
            success: 'GET_ONE_PHYSICAL_OBJECT_SUCCESS',
          },
        },
      })
    })
    it('return object with actionCreators scoped under correct operationTypes', () => {
      expect.assertions(1)

      const input = {
        resourceActionTypes: {
          getOne: {
            fail: 'GET_ONE_PHYSICAL_OBJECT_FAIL',
            request: 'GET_ONE_PHYSICAL_OBJECT_REQUEST',
            success: 'GET_ONE_PHYSICAL_OBJECT_SUCCESS',
          },
        },
        resourceSpecification: {
          operations: [
            {
              operationId: 'getPhysicalObject',
              type: 'getOne',
            },
            {
              operationId: 'createPhysicalObject',
              type: 'create',
            },
          ],
          resource: 'physicalObject',
        },
      }
      const res = createActionCreators(input)
      expect(Object.keys(res).sort()).toEqual(['getOne', 'create'].sort())
    })
  })
})
