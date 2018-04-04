const tryImport = () => {
  return import('./globalSelectors')
}

describe('dataModules/curatedListService/globalSelectors', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })
})
