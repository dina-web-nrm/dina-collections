const apiDescribe = require('../../../../utilities/test/apiDescribe')
const { makeTestCall } = require('../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../utilities/test/waitForApiRestart')

const {
  fullFormExample,
  UNEXPECTED_SUCCESS,
} = require('../../testData/individualGroup')

const badRequestMissingCatalogNumber = {
  data: {
    attributes: {
      featureObservations: [],
      identifications: [],
      occurrences: [],
      physicalUnits: [],
    },
    type: 'individualGroup',
  },
}

apiDescribe('individualGroup', () => {
  let authToken
  beforeAll(() => {
    return waitForApiRestart().then(() => {
      authToken = 1234
    })
  })

  it('Runs individualGroup tests', () => {
    expect(!!authToken).toBeTruthy()
    expect(1).toBe(1)
  })

  describe('createIndividualGroup', () => {
    it('Succeed with full form example', () => {
      return makeTestCall({
        authToken,
        body: fullFormExample,
        operationId: 'createIndividualGroup',
      }).then(res => {
        expect(res).toBeTruthy()
        expect(res.data).toBeTruthy()
        expect(res.data.type).toBe('individualGroup')
        expect(res.data.attributes).toBeTruthy()
        expect(res.data.attributes.physicalUnits).toBeTruthy()
        expect(res.data.attributes.featureObservations).toBeTruthy()
        expect(res.data.attributes.identifications).toBeTruthy()
        expect(res.data.attributes.occurrences).toBeTruthy()
      })
    })
    it('Fails create with missing catalog number', () => {
      return makeTestCall({
        authToken,
        body: badRequestMissingCatalogNumber,
        operationId: 'createIndividualGroup',
      })
        .then(() => {
          throw new Error(UNEXPECTED_SUCCESS)
        })
        .catch(err => {
          expect(err.message).not.toBe(UNEXPECTED_SUCCESS)
        })
    })
  })
})
