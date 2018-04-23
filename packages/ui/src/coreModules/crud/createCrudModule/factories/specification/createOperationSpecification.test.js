import { ALL_OPERATION_TYPES } from '../../../constants'
import createOperationSpecification from './createOperationSpecification'

describe('coreModules/crud/createCrudModule/factories/specification/createOperationSpecification', () => {
  it('is a function', () => {
    expect.assertions(1)
    expect(typeof createOperationSpecification).toBe('function')
  })
  it('it throws if type is not provided', () => {
    expect.assertions(1)
    const operationConfig = {
      operationId: 'getPhysicalObject',
    }
    expect(() => createOperationSpecification({ operationConfig })).toThrow()
  })
  it('it throws if operationId is not provided', () => {
    expect.assertions(1)
    const operationConfig = {
      type: 'getOne',
    }
    expect(() => createOperationSpecification({ operationConfig })).toThrow()
  })
  it('it throws if operationId is not provided', () => {
    expect.assertions(1)
    const operationConfig = {
      type: 'getOne',
    }
    expect(() => createOperationSpecification({ operationConfig })).toThrow()
  })
  it('create operation specification for getOne', () => {
    expect.assertions(1)
    const operationConfig = {
      operationId: 'getPhysicalObject',
      type: 'getOne',
    }
    const operationSpecification = createOperationSpecification({
      operationConfig,
    })
    expect(operationSpecification).toEqual({
      operationId: 'getPhysicalObject',
      type: 'getOne',
    })
  })
  it('create operation specification for all available types', () => {
    expect.assertions(ALL_OPERATION_TYPES.length)
    const operationConfig = {
      operationId: 'getPhysicalObject',
      type: 'getOne',
    }

    ALL_OPERATION_TYPES.forEach(type => {
      const operationSpecification = createOperationSpecification({
        operationConfig: {
          ...operationConfig,
          type,
        },
      })

      expect(operationSpecification).toEqual({
        operationId: 'getPhysicalObject',
        type,
      })
    })
  })
})
