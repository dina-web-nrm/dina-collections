const tryImport = () => {
  return import('./index')
}

describe('domainModules/specimenService/reducer', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })
})
