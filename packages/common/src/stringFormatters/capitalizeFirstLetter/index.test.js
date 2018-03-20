import capitalizeFirstLetter from './index'

describe('stringFormatting/capitalizeFirstLetter', () => {
  it('returns string with capital first letter', () => {
    const testValue = capitalizeFirstLetter('capitalize first')
    const expectedResult = 'Capitalize first'

    expect(testValue).toEqual(expectedResult)
  })
})
