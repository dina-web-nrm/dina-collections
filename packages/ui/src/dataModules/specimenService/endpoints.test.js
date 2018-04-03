import * as endpoints from './endpoints'

const expectedKeys = [
  'CREATE_SPECIMEN',
  'GET_SPECIMEN',
  'GET_SPECIMENS',
  'UPDATE_SPECIMEN',
]

describe('dataModules/specimenService/endpoints', () => {
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
