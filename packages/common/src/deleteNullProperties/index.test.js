const deleteNullProperties = require('./index')

describe('deleteNullProperties', () => {
  it('returns value if missing or not an object', () => {
    expect(undefined).toEqual(deleteNullProperties(undefined))
    expect(null).toEqual(deleteNullProperties(null))
    expect(1).toEqual(deleteNullProperties(1))
    expect('1').toEqual(deleteNullProperties('1'))
  })
  it('returns copy of original object if there are no null values', () => {
    const obj = {
      key: 'value',
    }

    const testValue = deleteNullProperties(obj)

    expect(testValue).toEqual(obj)
    expect(testValue).not.toBe(obj)
  })
  it('removes null values from object without mutating original object', () => {
    const obj = {
      arm: null,
      key: 'value',
      name: null,
    }

    const testValue = deleteNullProperties(obj)
    const expectedResult = {
      key: 'value',
    }

    expect(testValue).toEqual(expectedResult)
    expect(obj).toEqual({
      arm: null,
      key: 'value',
      name: null,
    })
  })
})
