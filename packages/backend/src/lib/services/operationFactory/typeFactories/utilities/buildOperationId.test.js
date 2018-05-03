const buildOperationId = require('./buildOperationId')

describe('lib/services/operationFactory/typeFactories/utilities/buildOperationId', () => {
  it('returns operationId from resource and operationType', () => {
    const operationType = 'getOne'
    const resource = 'specimen'
    const testValue = buildOperationId({ operationType, resource })
    const expectedResult = 'specimenGetOne'

    expect(testValue).toEqual(expectedResult)
  })

  it('returns operationId from resource, operationType and relationKey', () => {
    const operationType = 'getRelationHasMany'
    const relationKey = 'physicalObjects'
    const resource = 'storageLocation'

    const testValue = buildOperationId({ operationType, relationKey, resource })
    const expectedResult = 'storageLocationGetRelationHasManyPhysicalObjects'

    expect(testValue).toEqual(expectedResult)
  })
})
