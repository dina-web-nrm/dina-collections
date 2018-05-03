import createActionTypes, { dep } from './index'

describe('coreModules/crud/createCrudModule/factories/actionTypes/createActionTypes', () => {
  it('is a function', () => {
    expect.assertions(1)
    expect(typeof createActionTypes).toBe('function')
  })

  it('return empty object if no input provided', () => {
    expect.assertions(1)
    expect(createActionTypes()).toEqual({})
  })

  it('return empty object if no operations provided', () => {
    expect.assertions(1)
    expect(createActionTypes({})).toEqual({})
  })

  it('return empty object if empty operations array provided', () => {
    expect.assertions(1)
    expect(createActionTypes({ operations: [] })).toEqual({})
  })

  describe('with dependor', () => {
    let createActionTypeMock
    beforeEach(() => {
      createActionTypeMock = jest.fn()
      dep.freeze()
      dep.mock({
        createActionType: input => {
          createActionTypeMock(input)
          return input
        },
      })
    })
    afterAll(() => {
      dep.reset()
    })
    it('call createActionTypeMock 3 times for each operation', () => {
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
      createActionTypes(input)
      expect(createActionTypeMock.mock.calls.length).toEqual(9)
    })

    it('call createActionType with resource, suffix, type', () => {
      expect.assertions(4)
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

      createActionTypes(input)
      expect(createActionTypeMock.mock.calls.length).toEqual(3)
      expect(createActionTypeMock.mock.calls[0]).toEqual([
        {
          apiActionType: 'fail',
          operationType: 'getOne',
          resource: 'physicalObject',
        },
      ])
      expect(createActionTypeMock.mock.calls[1]).toEqual([
        {
          apiActionType: 'request',
          operationType: 'getOne',
          resource: 'physicalObject',
        },
      ])
      expect(createActionTypeMock.mock.calls[2]).toEqual([
        {
          apiActionType: 'success',
          operationType: 'getOne',
          resource: 'physicalObject',
        },
      ])
    })

    it('add result from createResourceSpecification scoped under apiActionType', () => {
      expect.assertions(2)

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
      const res = createActionTypes(input)
      expect(createActionTypeMock.mock.calls.length).toEqual(3)
      expect(res).toEqual({
        getOne: {
          fail: {
            apiActionType: 'fail',
            operationType: 'getOne',
            resource: 'physicalObject',
          },
          request: {
            apiActionType: 'request',
            operationType: 'getOne',
            resource: 'physicalObject',
          },
          success: {
            apiActionType: 'success',
            operationType: 'getOne',
            resource: 'physicalObject',
          },
        },
      })
    })
  })
})
