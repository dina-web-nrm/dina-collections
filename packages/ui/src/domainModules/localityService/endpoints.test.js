import * as endpoints from './endpoints'

const expectedKeys = [
  'CREATE_CURATED_LOCALITY',
  'GET_CURATED_LOCALITY',
  'GET_CURATED_LOCALITIES',
  'UPDATE_CURATED_LOCALITY',
]

describe('domainModules/localityService/endpoints', () => {
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
