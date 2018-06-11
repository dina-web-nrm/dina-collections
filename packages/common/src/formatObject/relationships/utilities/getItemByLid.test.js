const { getItemByLid } = require('./getItemByLid')

describe('formatObject/relationships/utilities/resolveByPath/getItemByLid', () => {
  test('is a function', () => {
    const testValue = typeof getItemByLid
    const expectedResult = 'function'

    expect(testValue).toEqual(expectedResult)
  })

  test('returns undefined if missing lid', () => {
    const testValue = getItemByLid({ lid: undefined })
    const expectedResult = undefined

    expect(testValue).toEqual(expectedResult)
  })

  test('returns undefined if empty relationshipItems', () => {
    const testValue = getItemByLid({ lid: 'abc', relationshipItems: [] })
    const expectedResult = undefined

    expect(testValue).toEqual(expectedResult)
  })

  test('returns undefined if relationshipItems does not have lid', () => {
    const testValue = getItemByLid({
      lid: 'abc',
      relationshipItems: [{ id: '123' }],
    })
    const expectedResult = undefined

    expect(testValue).toEqual(expectedResult)
  })

  test('returns undefined if no relationshipItem matches lid', () => {
    const testValue = getItemByLid({
      lid: 'abc',
      relationshipItems: [{ lid: '123' }],
    })
    const expectedResult = undefined

    expect(testValue).toEqual(expectedResult)
  })

  test('does not throw if relationshipItems has non-object elements', () => {
    const testValue = () =>
      getItemByLid({
        lid: 'abc',
        relationshipItems: [
          null,
          undefined,
          { attributes: { lid: 'abc' } },
          ['asd'],
        ],
      })

    expect(testValue).not.toThrow()
  })

  test('returns item if lids match relationshipItem', () => {
    const targetItem = { attributes: { lid: 'abc', name: 'Jane' }, id: '2' }
    const testValue = getItemByLid({
      lid: 'abc',
      relationshipItems: [
        { attributes: { lid: 'xyz', name: 'John' }, id: '1' },
        targetItem,
        null,
      ],
    })
    const expectedResult = targetItem

    expect(testValue).toEqual(expectedResult)
  })
})
