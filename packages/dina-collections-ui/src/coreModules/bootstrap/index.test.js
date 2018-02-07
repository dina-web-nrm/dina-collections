const tryImport = () => {
  return import('./index')
}

describe('coreModules/bootstrap/index', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })
})
