const getNextWalkPath = require('./getNextWalkPath')

describe('formatObject/utilities/getNextWalkPath', () => {
  test('returns dot-joined path and first segment', () => {
    const testValue = getNextWalkPath({
      path: 'thisIsNotTheEnd',
      segments: [
        'itIsNotEvenTheBeginningOfTheEnd',
        'butItIsPerhapsTheEndOfTheBeginning',
      ],
    })
    const expectedResult = 'thisIsNotTheEnd.itIsNotEvenTheBeginningOfTheEnd'

    expect(testValue).toEqual(expectedResult)
  })
})
