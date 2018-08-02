import {
  extractFilterParams,
  getFilterFunction,
  getFilterType,
  getTrimmedExcludeKey,
  hasFilterParams,
} from './buildQuery'

describe('domainModules/collectionMammals/components/MammalManager/FilterColumn/utilities/buildQuery', () => {
  describe('hasFilterParams', () => {
    test('returns false', () => {
      const testValue = hasFilterParams('nofilter')
      const expectedResult = false

      expect(testValue).toEqual(expectedResult)
    })
    test('returns true', () => {
      const testValue = hasFilterParams('name|filter-params')
      const expectedResult = true

      expect(testValue).toEqual(expectedResult)
    })
  })
  describe('extractFilterParams', () => {
    test('returns filter params', () => {
      const testValue = extractFilterParams('name|filterType-filterFunction')
      const expectedResult = {
        filterFunction: 'filterFunction',
        filterType: 'filterType',
      }

      expect(testValue).toEqual(expectedResult)
    })
  })
  describe('getFilterFunction', () => {
    test('returns filterFunction', () => {
      const testValue = getFilterFunction('name|filterType-filterFunction')
      const expectedResult = 'filterFunction'

      expect(testValue).toEqual(expectedResult)
    })
  })
  describe('getFilterType', () => {
    test('returns filterType', () => {
      const testValue = getFilterType('name|filterType-filterType')
      const expectedResult = 'filterType'

      expect(testValue).toEqual(expectedResult)
    })
  })
  describe('getTrimmedExcludeKey', () => {
    test('returns original key', () => {
      const testValue = getTrimmedExcludeKey('noDotInKey')
      const expectedResult = 'noDotInKey'

      expect(testValue).toEqual(expectedResult)
    })
    test('returns trimmed key', () => {
      const testValue = getTrimmedExcludeKey('agent.name|filterType-filterType')
      const expectedResult = 'name|filterType-filterType'

      expect(testValue).toEqual(expectedResult)
    })
  })
})
