const tryImport = () => {
  return import('./constants')
}

describe('domainModules/taxonService/constants', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })

  it('exports MODULE_NAME', () => {
    return tryImport().then(constants => {
      return expect(Object.keys(constants)).toContain('MODULE_NAME')
    })
  })
})
