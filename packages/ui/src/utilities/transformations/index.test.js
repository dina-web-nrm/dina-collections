const tryImport = () => {
  return import('./index')
}

describe('utilities/transformations', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })
})
