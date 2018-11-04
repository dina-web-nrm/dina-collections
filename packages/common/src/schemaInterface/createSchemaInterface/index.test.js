const createSchemaInterface = require('./index')

const expectedFunctions = [
  'getDataModelVersion',
  'getMethodByOperationId',
  'getModelKeyColumnMap',
  'getModels',
  'getNormalizedModels',
  'getNormalizeSpecifications',
  'getOpenApiSpec',
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
