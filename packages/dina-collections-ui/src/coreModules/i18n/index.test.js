const tryImport = () => {
  return import('./index')
}

describe('i18n/index', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })
})
