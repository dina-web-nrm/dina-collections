const apiDescribe = require('../../utilities/test/apiDescribe')
const { makeTestCall } = require('../../utilities/test/testApiClient')
const waitForApiRestart = require('../../utilities/test/waitForApiRestart')

const physicalUnitExample = {
  data: {
    attributes: {
      id: 'string',
      identifiableUnits: [null],
      normalStorageLocationText: 'string',
      storageLocation: {
        id: 'string',
        locationText: 'string',
      },
      storedUnderTaxonName: 'Sorex minutus',
    },
    id: '1234',
    type: 'string',
  },
}

const storageLocationExample = {
  data: {
    attributes: {
      id: 'string',
      locationText: 'string',
    },
    id: '1234',
    type: 'string',
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
      }).then(res => {
        expect(res).toBeTruthy()
        expect(res.data).toBeTruthy()
        expect(res.data.type).toBe('storageLocation')
        expect(res.data.attributes).toBeTruthy()
      })
    })
  })
})
