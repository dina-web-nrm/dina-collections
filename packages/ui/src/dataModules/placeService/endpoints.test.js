import * as endpoints from './endpoints'

const expectedKeys = ['CREATE_PLACE', 'GET_PLACE', 'GET_PLACES', 'UPDATE_PLACE']

describe('dataModules/placeService/endpoints', () => {
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
