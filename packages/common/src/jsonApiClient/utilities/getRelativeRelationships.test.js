const { getRelativeRelationships } = require('./getRelativeRelationships')

describe('jsonApiClient/utilities/getRelativeRelationships', () => {
  test('returns undefined if path is undefined', () => {
    const testValue = getRelativeRelationships({
      path: undefined,
      relationSpecification: undefined,
    })
    const expectedResult = undefined

    expect(testValue).toEqual(expectedResult)
  })

  test('returns undefined if relationSpecification is undefined', () => {
    const testValue = getRelativeRelationships({
      path: '.',
      relationSpecification: undefined,
    })
    const expectedResult = undefined

    expect(testValue).toEqual(expectedResult)
  })

  test('returns undefined if there are no values in relationSpecification', () => {
    const testValue = getRelativeRelationships({
      path: '.',
      relationSpecification: {},
    })
    const expectedResult = undefined

    expect(testValue).toEqual(expectedResult)
  })

  test('returns array of relationSpecification keys with defined values', () => {
    const testValue = getRelativeRelationships({
      path: '.',
      relationSpecification: { agents: [], notDefined: undefined, users: [] },
    })
    const expectedResult = ['agents', 'users']

    expect(testValue).toEqual(expectedResult)
  })
})
