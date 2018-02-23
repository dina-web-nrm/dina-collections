const apiDescribe = require('../../utilities/test/apiDescribe')
const { makeTestCall } = require('../../utilities/test/testApiClient')
const waitForApiRestart = require('../../utilities/test/waitForApiRestart')

const physicalUnitExample = {
  data: {
    attributes: {
      normalStorageLocationText: 'string',
      storedUnderTaxonName: 'Sorex minutus',
    },
    type: 'physicalUnit',
  },
}

const storageLocationExample = {
  data: {
    attributes: {
      locationText: 'some location',
    },
    type: 'storageLocation',
  },
}

apiDescribe('storage', () => {
  let authToken
  beforeAll(() => {
    return waitForApiRestart().then(() => {
      authToken = 1234
    })
  })

  it('Runs storage tests', () => {
    expect(!!authToken).toBeTruthy()
    expect(1).toBe(1)
  })

  describe('createPhysicalUnit', () => {
    it('Succeed with simple example', () => {
      return makeTestCall({
        authToken,
        body: physicalUnitExample,
        operationId: 'createPhysicalUnit',
        validateOutput: true,
      }).then(res => {
        expect(res).toBeTruthy()
        expect(res.data).toBeTruthy()
        expect(res.data.type).toBe('physicalUnit')
        expect(res.data.attributes).toBeTruthy()
      })
    })
  })
  describe('createStorageLocation', () => {
    it('Succeed with simple example', () => {
      return makeTestCall({
        authToken,
        body: storageLocationExample,
        operationId: 'createStorageLocation',
        validateOutput: true,
      }).then(res => {
        expect(res).toBeTruthy()
        expect(res.data).toBeTruthy()
        expect(res.data.type).toBe('storageLocation')
        expect(res.data.attributes).toBeTruthy()
      })
    })
  })
  describe('Tmp', () => {
    it('Succeed with complex relation example', () => {
      let storageLocationId
      let physicalUnitId
      return makeTestCall({
        authToken,
        body: storageLocationExample,
        operationId: 'createStorageLocation',
        validateOutput: true,
      })
        .then(storageLocationRes => {
          expect(storageLocationRes).toBeTruthy()
          expect(storageLocationRes.data).toBeTruthy()
          expect(storageLocationRes.data.type).toBe('storageLocation')
          expect(storageLocationRes.data.attributes).toBeTruthy()
          storageLocationId = storageLocationRes.data.id
          return storageLocationId
        })
        .then(() => {
          return makeTestCall({
            authToken,
            body: physicalUnitExample,
            operationId: 'createPhysicalUnit',
            validateOutput: true,
          }).then(physicalUnitRes => {
            expect(physicalUnitRes).toBeTruthy()
            expect(physicalUnitRes.data).toBeTruthy()
            expect(physicalUnitRes.data.type).toBe('physicalUnit')
            physicalUnitId = physicalUnitRes.data.id
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            body: {
              data: {
                id: storageLocationId,
                type: 'storageLocation',
              },
            },
            operationId: 'updatePhysicalUnitStorageLocation',
            pathParams: {
              id: physicalUnitId,
            },
            validateOutput: true,
          }).then(createRelationRes => {
            expect(createRelationRes).toBeTruthy()
            expect(createRelationRes.data).toBeTruthy()
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            operationId: 'getPhysicalUnitStorageLocation',
            pathParams: {
              id: physicalUnitId,
            },
            validateOutput: true,
          }).then(getRelationRes => {
            expect(getRelationRes).toBeTruthy()
            expect(getRelationRes.data).toBeTruthy()
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            operationId: 'getStorageLocationPhysicalUnits',
            pathParams: {
              id: storageLocationId,
            },
            validateOutput: true,
          }).then(getStorageRelationRes => {
            expect(getStorageRelationRes).toBeTruthy()
            expect(getStorageRelationRes.data).toBeTruthy()
            expect(getStorageRelationRes.data.length > 0).toBeTruthy()
          })
        })
    })
  })
  describe('Tmp2', () => {
    it('Succeed with relation example', () => {
      let storageLocationId
      let physicalUnitId
      return makeTestCall({
        authToken,
        body: storageLocationExample,
        operationId: 'createStorageLocation',
        validateOutput: true,
      })
        .then(storageLocationRes => {
          expect(storageLocationRes).toBeTruthy()
          expect(storageLocationRes.data).toBeTruthy()
          expect(storageLocationRes.data.type).toBe('storageLocation')
          expect(storageLocationRes.data.attributes).toBeTruthy()
          storageLocationId = storageLocationRes.data.id
          return storageLocationId
        })
        .then(() => {
          return makeTestCall({
            authToken,
            body: physicalUnitExample,
            operationId: 'createPhysicalUnit',
            validateOutput: true,
          }).then(physicalUnitRes => {
            expect(physicalUnitRes).toBeTruthy()
            expect(physicalUnitRes.data).toBeTruthy()
            expect(physicalUnitRes.data.type).toBe('physicalUnit')
            physicalUnitId = physicalUnitRes.data.id
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            body: {
              data: {
                id: storageLocationId,
                type: 'storageLocation',
              },
            },
            operationId: 'updatePhysicalUnitStorageLocation',
            pathParams: {
              id: physicalUnitId,
            },
            validateOutput: true,
          }).then(createRelationRes => {
            expect(createRelationRes).toBeTruthy()
            expect(createRelationRes.data).toBeTruthy()
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            operationId: 'getPhysicalUnit',
            pathParams: {
              id: physicalUnitId,
            },
            validateOutput: true,
          }).then(physicalUnit => {
            expect(physicalUnit).toBeTruthy()
            expect(physicalUnit.data).toBeTruthy()
            expect(physicalUnit.data.relationships.storageLocation).toBeTruthy()
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            operationId: 'getStorageLocation',
            pathParams: {
              id: storageLocationId,
            },
            validateOutput: true,
          }).then(storageLocation => {
            expect(storageLocation).toBeTruthy()
            expect(
              storageLocation.data.relationships.physicalUnits
            ).toBeTruthy()
            expect(
              storageLocation.data.relationships.physicalUnits.data[0]
            ).toBeTruthy()
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            operationId: 'getPhysicalUnits',
            validateOutput: true,
          }).then(physicalUnits => {
            expect(physicalUnits).toBeTruthy()
            const { data } = physicalUnits
            expect(data[0].relationships.storageLocation.data.id).toBe(
              storageLocationId
            )
          })
        })
        .then(() => {
          return makeTestCall({
            authToken,
            operationId: 'getStorageLocations',
            validateOutput: true,
          }).then(storageLocations => {
            expect(storageLocations).toBeTruthy()
            const { data } = storageLocations
            expect(data[0].relationships.physicalUnits.data[0].id).toBe(
              physicalUnitId
            )
          })
        })
    })
  })
})
