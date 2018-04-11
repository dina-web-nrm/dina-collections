const exportedFunctions = require('./index')

const expectedFunctions = ['createSortAlphabeticallyByProperty']

describe('sortMethods', () => {
  it('exports expected functions', () => {
    expect(Object.keys(exportedFunctions).sort()).toEqual(
      expectedFunctions.sort()
    )
  })
})
