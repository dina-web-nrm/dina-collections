const createSchemaInterface = require('./index')

const expectedFunctions = [
  'getRelationshipParamsForModelNames',
  'getResourceRelationshipKeysToIncludeInBodyMap',
  'getResourceRelationshipParamsMap',
]

describe('schemaInterface/createSchemaInterface', () => {
  it('exports a function', () => {
    expect(typeof createSchemaInterface).toEqual('function')
  })
  it('returns expected functions', () => {
    expect(Object.keys(createSchemaInterface({})).sort()).toEqual(
      expectedFunctions.sort()
    )
  })
})
