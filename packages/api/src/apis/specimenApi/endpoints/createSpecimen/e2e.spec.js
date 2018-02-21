const apiDescribe = require('../../../../utilities/test/apiDescribe')
const { makeTestCall } = require('../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../utilities/test/waitForApiRestart')

const { UNEXPECTED_SUCCESS } = require('../../testData/individualGroup')

const fullFormExample = require('./examples/fullFormExample')

const badRequestMissingCatalogNumber = {
  data: {
    attributes: {
      individualGroup: {
        assignedTaxon: {},
        featureObservations: [],
        identifiableUnits: [],
        identifiers: [],
      },
    },
    type: 'specimen',
  },
}

apiDescribe('specimen', () => {
  let authToken
  beforeAll(() => {
    return waitForApiRestart().then(() => {
      authToken = 1234
    })
  })

  it('Runs specimen tests', () => {
    expect(!!authToken).toBeTruthy()
    expect(1).toBe(1)
  })

  describe('createIndividualGroup', () => {
    it('Succeed with full form example', () => {
      return makeTestCall({
        authToken,
        body: fullFormExample,
        operationId: 'createSpecimen',
      }).then(res => {
        expect(res).toBeTruthy()
        expect(res.data).toBeTruthy()
        expect(res.data.type).toBe('specimen')
        expect(res.data.attributes).toBeTruthy()
      })
    })
    it('Fails create with missing catalog number', () => {
      return makeTestCall({
        authToken,
        body: badRequestMissingCatalogNumber,
        operationId: 'createSpecimen',
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
