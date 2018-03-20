import * as endpoints from './endpoints'

const expectedKeys = [
  'CREATE_PHYSICAL_UNIT',
  'CREATE_STORAGE_LOCATION',
  'GET_PHYSICAL_UNIT',
  'GET_PHYSICAL_UNITS',
  'GET_STORAGE_LOCATION',
  'GET_STORAGE_LOCATIONS',
  'UPDATE_PHYSICAL_UNIT',
  'UPDATE_STORAGE_LOCATION',
]

describe('domainModules/storageService/endpoints', () => {
  it('exports expected endpoints', () => {
    expect(Object.keys(endpoints).sort()).toEqual(expectedKeys.sort())
  })

  Object.keys(endpoints).forEach(endpointKey => {
    it('contains methodname, operationId and pathname', () => {
      const endpoint = endpoints[endpointKey]
      const keys = Object.keys(endpoint)
      expect(keys).toContain('methodName')
      expect(keys).toContain('operationId')
      expect(keys).toContain('pathname')
    })
  })
})
