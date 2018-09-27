const createDeleteProperties = require('./index')

describe('createDeleteProperties', () => {
  it('returns function', () => {
    expect(typeof createDeleteProperties(null)).toEqual('function')
  })

  describe('deleteEmptyStringProperties', () => {
    let deleteEmptyStringProperties
    beforeAll(() => {
      deleteEmptyStringProperties = createDeleteProperties('')
    })
    it('returns value if missing or not an object', () => {
      expect(undefined).toEqual(deleteEmptyStringProperties(undefined))
      expect(null).toEqual(deleteEmptyStringProperties(null))
      expect(1).toEqual(deleteEmptyStringProperties(1))
      expect('1').toEqual(deleteEmptyStringProperties('1'))
    })
    it('returns copy of original object if there are no empty string values', () => {
      const obj = {
        key: 'value',
        something: null,
      }

      const testValue = deleteEmptyStringProperties(obj)

      expect(testValue).toEqual(obj)
      expect(testValue).not.toBe(obj)
    })
    it('removes empty string values from object', () => {
      const obj = {
        arm: null,
        key: 'value',
        name: null,
        removeThis: '',
      }

      const testValue = deleteEmptyStringProperties(obj)
      const expectedResult = {
        arm: null,
        key: 'value',
        name: null,
      }

      expect(testValue).toEqual(expectedResult)
    })
    it('does not mutate original object when removing values', () => {
      const obj = {
        arm: null,
        key: 'value',
        name: null,
        removeThis: '',
      }

      const testValue = deleteEmptyStringProperties(obj)

      expect(testValue).not.toBe(obj)
      expect(obj).toEqual({
        arm: null,
        key: 'value',
        name: null,
        removeThis: '',
      })
    })
  })

  describe('deleteNullProperties', () => {
    let deleteNullProperties
    beforeAll(() => {
      deleteNullProperties = createDeleteProperties(null)
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
      expect(testValue).not.toBe(obj)
      expect(obj).toEqual({
        arm: null,
        key: 'value',
        name: null,
      })
    })
  })
})
