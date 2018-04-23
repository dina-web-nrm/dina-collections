import createItemUpdatePath from './createItemUpdatePath'

describe('coreModules/crud/createCrudModule/factories/actionHandlers/createItemUpdatePath', () => {
  it('is a function', () => {
    expect.assertions(1)
    expect(typeof createItemUpdatePath).toBe('function')
  })
  it('return null if id not provided', () => {
    expect.assertions(1)

    expect(createItemUpdatePath()).toEqual(null)
  })
  it('return id scoped under items', () => {
    expect.assertions(1)

    expect(createItemUpdatePath({ id: 22 })).toEqual('items.22')
  })
})
