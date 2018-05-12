import * as endpoints from './endpoints'

const expectedKeys = [
  'CREATE_TAXON_NAME',
  'CREATE_TAXON',
  'GET_TAXA',
  'GET_TAXON_NAME',
  'GET_TAXON_NAMES',
  'GET_TAXON',
  'UPDATE_TAXON_NAME',
  'UPDATE_TAXON',
]

describe('dataModules/taxonService/endpoints', () => {
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
