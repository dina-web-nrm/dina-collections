const tryImport = () => {
  return import('./index')
}

const expectedActionCreators = [
  'createFeatureType',
  'getPreparationType',
  'getPreparationTypes',
  'getFeatureType',
  'getFeatureTypes',
  'updateFeatureType',
]

describe('dataModules/curatedListService/actionCreators', () => {
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
