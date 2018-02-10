const tryImport = () => {
  return import('./constants')
}

describe('coreModules/bootstrap/constants', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })
})
