const tryImport = () => {
  return import('./index')
}

describe('dataModules/curatedListService/reducer/resources', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })
})
