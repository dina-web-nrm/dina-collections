import * as exportedFunctions from './index'

const expectedFunctions = ['capitalizeFirstLetter']

describe('stringFormatters', () => {
  it('exports expected functions', () => {
    expect(Object.keys(exportedFunctions).sort()).toEqual(
      expectedFunctions.sort()
    )
  })
})
