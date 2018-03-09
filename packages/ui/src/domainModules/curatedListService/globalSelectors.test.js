const tryImport = () => {
  return import('./globalSelectors')
}

describe('domainModules/curatedListService/constants', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })
})
