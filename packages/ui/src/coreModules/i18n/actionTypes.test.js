const tryImport = () => {
  return import('./actionTypes')
}

describe('i18n/actionTypes', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })
})
