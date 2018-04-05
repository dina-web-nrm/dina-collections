const tryImport = () => {
  return import('./index')
}

const expectedActionCreators = [
  'createTaxon',
  'getTaxaByName',
  'getTaxon',
  'updateTaxon',
]

describe('dataModules/taxonService/actionCreators', () => {
  it('imports without error', () => {
    expect.assertions(1)
    return expect(tryImport()).resolves.toBeTruthy()
  })

  it('exports expected action creators', () => {
    expect.assertions(1)
    return tryImport().then(actionCreators => {
      return expect(Object.keys(actionCreators).sort()).toEqual(
        expectedActionCreators.sort()
      )
    })
  })
})
