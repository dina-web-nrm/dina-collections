const tryImport = () => {
  return import('./schemas')
}

describe('i18n/schemas', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })
})
