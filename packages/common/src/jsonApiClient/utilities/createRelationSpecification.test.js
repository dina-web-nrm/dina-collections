const createRelationSpecification = require('./createRelationSpecification')

describe('jsonApiClient/utilities/createRelationSpecification', () => {
  test('returns empty object if no relationships or include specified', () => {
    const testValue = createRelationSpecification({
      include: undefined,
      relationships: undefined,
    })
    const expectedResult = {}

    expect(testValue).toEqual(expectedResult)
  })

  test('throws if include contains something not in relationships', () => {
    const testValue = () =>
      createRelationSpecification({
        include: ['agent'],
        relationships: undefined,
      })

    expect(testValue).toThrow(
      'Cannot include resource not specificed in relationships'
    )
  })

  test('does not throw if include contains something and relationships is all', () => {
    const testValue = () =>
      createRelationSpecification({
        include: ['agent'],
        relationships: ['all'],
      })

    expect(testValue).not.toThrow(
      'Cannot include resource not specificed in relationships'
    )
  })

  test('returns relationship key with value false, if not included', () => {
    const testValue = createRelationSpecification({
      include: undefined,
      relationships: ['agent', 'user'],
    })

    const expectedResult = {
      agent: false,
      user: false,
    }

    expect(testValue).toEqual(expectedResult)
  })

  test('returns relationship key with value true, if included', () => {
    const testValue = createRelationSpecification({
      include: ['agent'],
      relationships: ['agent', 'user'],
    })

    const expectedResult = {
      agent: true,
      user: false,
    }

    expect(testValue).toEqual(expectedResult)
  })
})
