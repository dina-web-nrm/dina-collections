import getSecondArgument from './index'

describe('utilities/getSecondArgument', () => {
  it('returns second argument', () => {
    const testValue = getSecondArgument('first', 'second')
    const expectedResult = 'second'

    expect(testValue).toEqual(expectedResult)
  })
})
