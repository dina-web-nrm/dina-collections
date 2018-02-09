const tryImport = () => {
  return import('./actionTypes')
}

describe('coreModules/bootstrap/actionTypes', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })
})
