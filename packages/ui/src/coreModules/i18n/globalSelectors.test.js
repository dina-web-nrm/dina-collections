const tryImport = () => {
  return import('./globalSelectors')
}

describe('i18n/globalSelectors', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })
})
