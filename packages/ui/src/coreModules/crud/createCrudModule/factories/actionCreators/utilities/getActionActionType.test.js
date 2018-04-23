import getActionActionType from './getActionActionType'

describe('coreModules/crud/createCrudModule/factories/actionCreators/utilities/getActionActionType', () => {
  it('is a function', () => {
    expect.assertions(1)
    expect(typeof getActionActionType).toBe('function')
  })
  it('it throws if resourceActionTypes not provided', () => {
    expect.assertions(1)
    const input = {
      actionType: 'request',
      operationType: 'getOne',
      resource: 'physicalObject',
    }
    expect(() => getActionActionType(input)).toThrow()
  })
  it('it throws if actionType not provided', () => {
    expect.assertions(1)
    const input = {
      operationType: 'create',
      resource: 'physicalObject',
      resourceActionTypes: {
        create: {
          request: 'CREATE_PHYSICAL_OBJECT_REQUEST',
        },
      },
    }
    expect(() => getActionActionType(input)).toThrow()
  })
  it('it throws if operationType not provided', () => {
    expect.assertions(1)
    const input = {
      actionType: 'request',
      resource: 'physicalObject',
      resourceActionTypes: {
        create: {
          request: 'CREATE_PHYSICAL_OBJECT_REQUEST',
        },
      },
    }
    expect(() => getActionActionType(input)).toThrow()
  })
})
