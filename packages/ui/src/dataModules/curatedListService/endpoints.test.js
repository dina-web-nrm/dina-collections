import * as endpoints from './endpoints'

const expectedKeys = [
  'CREATE_FEATURE_OBSERVATION_TYPE',
  'GET_PREPARATION_TYPE',
  'GET_PREPARATION_TYPES',
  'GET_FEATURE_OBSERVATION_TYPE',
  'GET_FEATURE_OBSERVATION_TYPES',
  'UPDATE_FEATURE_OBSERVATION_TYPE',
]

describe('dataModules/curatedListService/endpoints', () => {
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
