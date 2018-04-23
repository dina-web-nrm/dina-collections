import createActionType from './createActionType'

describe('coreModules/crud/createCrudModule/factories/actionTypes/createActionType', () => {
  it('is a function', () => {
    expect.assertions(1)
    expect(typeof createActionType).toBe('function')
  })
  it('created actionType from input', () => {
    expect.assertions(1)

    expect(
      createActionType({
        apiActionType: 'SUCCESS',
        operationType: 'getMany',
        resource: 'physicalObject',
      })
    ).toEqual('GET_MANY_PHYSICAL_OBJECT_SUCCESS')
  })
})
