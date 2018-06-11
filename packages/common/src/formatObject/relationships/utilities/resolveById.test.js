const { resolveById } = require('./resolveById')

describe('formatObject/relationships/utilities/resolveById', () => {
  test('is a function', () => {
    const testValue = typeof resolveById
    const expectedResult = 'function'

    expect(testValue).toEqual(expectedResult)
  })

  test('returns object with id if missing formattedRelationships', () => {
    const testValue = resolveById({
      formattedRelationshipItems: undefined,
      id: '123',
    })
    const expectedResult = { id: '123' }

    expect(testValue).toEqual(expectedResult)
  })

  test('returns undefined if item with id is not in formattedRelationships', () => {
    const testValue = resolveById({
      formattedRelationshipItems: [{ id: 'abc' }],
      id: '123',
    })
    const expectedResult = undefined

    expect(testValue).toEqual(expectedResult)
  })

  test('returns undefined if item with id is not in formattedRelationships', () => {
    const testValue = resolveById({
      formattedRelationshipItems: [
        { id: 'abc' },
        { attributes: { type: 'holy' }, id: 'grail' },
      ],
      id: 'grail',
    })
    const expectedResult = { attributes: { type: 'holy' }, id: 'grail' }

    expect(testValue).toEqual(expectedResult)
  })
})
