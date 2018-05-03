import createResourceSpecification, { dep } from './createResourceSpecification'

describe('coreModules/crud/createCrudModule/factories/specification/createResourceSpecification', () => {
  it('is a function', () => {
    expect.assertions(1)
    expect(typeof createResourceSpecification).toBe('function')
  })
  it('it throws if resourceName is not provided', () => {
    expect.assertions(1)
    expect(() =>
      createResourceSpecification({
        resourceConfig: {},
      })
    ).toThrow()
  })
  it('it throws if resourceConfig is not provided', () => {
    expect.assertions(1)
    expect(() =>
      createResourceSpecification({
        resourceName: 'physicalObject',
      })
    ).toThrow()
  })
  it('return resourceConfig with added resourceName and operations', () => {
    expect.assertions(2)

    const input = {
      resourceConfig: {
        param: 1,
      },
      resourceName: 'physicalObject',
    }
    const res = createResourceSpecification(input)
    expect(res).toEqual({
      operations: [],
      param: 1,
      resource: 'physicalObject',
    })

    expect(res).not.toBe(input.resourceConfig)
  })

  describe('with dependor', () => {
    let createOperationSpecificationMock
    beforeEach(() => {
      createOperationSpecificationMock = jest.fn()
      dep.freeze()
      dep.mock({
        createOperationSpecification: input => {
          createOperationSpecificationMock(input)
          return input
        },
      })
    })
    afterAll(() => {
      dep.reset()
    })
    it('call createOperationSpecifiction for each operation', () => {
      expect.assertions(1)

      const input = {
        resourceConfig: {
          operations: [
            {
              operationId: 'physicalObjectGetOne',
              type: 'getOne',
            },
            {
              operationId: 'physicalObjectGetOne',
              type: 'getMany',
            },
          ],
          param: 1,
        },
        resourceName: 'physicalObject',
      }
      createResourceSpecification(input)
      expect(createOperationSpecificationMock.mock.calls.length).toEqual(2)
    })
    it('call createOperationSpecifiction with operationConfig and resourceName', () => {
      expect.assertions(2)

      const input = {
        resourceConfig: {
          operations: [
            {
              operationId: 'physicalObjectGetOne',
              type: 'getOne',
            },
          ],
          param: 1,
        },
        resourceName: 'physicalObject',
      }
      createResourceSpecification(input)
      expect(createOperationSpecificationMock.mock.calls.length).toEqual(1)
      expect(createOperationSpecificationMock.mock.calls[0]).toEqual([
        {
          operationConfig: input.resourceConfig.operations[0],
          resourceName: 'physicalObject',
        },
      ])
    })
    it('add result from createOperationSpecifiction to operations array', () => {
      expect.assertions(2)

      const input = {
        resourceConfig: {
          operations: [
            {
              operationId: 'physicalObjectGetOne',
              type: 'getOne',
            },
          ],
          param: 1,
        },
        resourceName: 'physicalObject',
      }
      const res = createResourceSpecification(input)
      expect(createOperationSpecificationMock.mock.calls.length).toEqual(1)
      expect(res.operations).toEqual([
        {
          operationConfig: input.resourceConfig.operations[0],
          resourceName: 'physicalObject',
        },
      ])
    })
  })
})
