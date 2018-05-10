const tryImport = () => {
  return import('./index')
}

describe('dataModules/storageService/reducer', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })
})
