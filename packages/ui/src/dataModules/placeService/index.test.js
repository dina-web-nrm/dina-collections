const tryImport = () => {
  return import('./index')
}

describe('dataModules/placeService/index', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })

  it('exports name', () => {
    return tryImport().then(entry => {
      return expect(Object.keys(entry)).toContain('name')
    })
  })
})
