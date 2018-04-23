import createSpecification, { dep } from './index'

describe('coreModules/crud/createCrudModule/factories/specification', () => {
  it('is a function', () => {
    expect.assertions(1)
    expect(typeof createSpecification).toBe('function')
  })

  it('return empty object if no input provided', () => {
    expect.assertions(1)
    expect(createSpecification()).toEqual({})
  })
  it('return new empty object if empty object provided', () => {
    expect.assertions(2)
    const input = {}
    expect(createSpecification(input)).toEqual({})
    expect(createSpecification(input)).not.toBe(input)
  })

  it('return object with empty resources if no resources provided', () => {
    expect.assertions(2)
    const input = { resources: {} }
    expect(createSpecification(input)).toEqual({ resources: {} })
    expect(createSpecification(input)).not.toBe(input)
  })

  describe('with dependor', () => {
    let createResourceSpecificationMock
    beforeEach(() => {
      createResourceSpecificationMock = jest.fn()
      dep.freeze()
      dep.mock({
        createResourceSpecification: input => {
          createResourceSpecificationMock(input)
          return input
        },
      })
    })
    afterAll(() => {
      dep.reset()
    })
    it('call createResourceSpecification for each resource', () => {
      expect.assertions(1)

      const input = {
        resources: {
          physicalObject: {
            operations: [],
          },
          storageLocation: {
            operations: [],
          },
        },
      }
      createSpecification(input)
      expect(createResourceSpecificationMock.mock.calls.length).toEqual(2)
    })
    it('call createResourceSpecification with resourceConfig and resourceName', () => {
      expect.assertions(2)

      const input = {
        resources: {
          physicalObject: {
            operations: [],
          },
        },
      }

      createSpecification(input)
      expect(createResourceSpecificationMock.mock.calls.length).toEqual(1)
      expect(createResourceSpecificationMock.mock.calls[0]).toEqual([
        {
          resourceConfig: input.resources.physicalObject,
          resourceName: 'physicalObject',
        },
      ])
    })
    it('add result from createResourceSpecification to resources object', () => {
      expect.assertions(2)

      const input = {
        param: 1,
        resources: {
          physicalObject: {
            operations: [],
          },
        },
      }
      const res = createSpecification(input)
      expect(createResourceSpecificationMock.mock.calls.length).toEqual(1)
      expect(res).toEqual({
        param: 1,
        resources: {
          physicalObject: {
            resourceConfig: input.resources.physicalObject,
            resourceName: 'physicalObject',
          },
        },
      })
    })
  })
})
