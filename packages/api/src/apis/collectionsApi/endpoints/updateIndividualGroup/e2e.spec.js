const apiDescribe = require('../../../../utilities/test/apiDescribe')
const { makeTestCall } = require('../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../utilities/test/waitForApiRestart')
const {
  fullFormExample,
  updateFullFormExample,
  UNEXPECTED_SUCCESS,
} = require('../../testData/individualGroup')

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

  describe('updateIndividualGroup', () => {
    let existingId
    beforeEach(() => {
      return makeTestCall({
        authToken,
        body: fullFormExample,
        operationId: 'createIndividualGroup',
      }).then(res => {
        existingId = res.data.id
      })
    })
    it('Succeed with valid individualGroup', () => {
      return makeTestCall({
        authToken,
        body: updateFullFormExample,
        operationId: 'updateIndividualGroup',
        pathParams: { id: existingId },
      }).then(res => {
        expect(res).toBeTruthy()
      })
    })
    it('Fails with missing body', () => {
      return makeTestCall({
        authToken,
        operationId: 'updateIndividualGroup',
        pathParams: { id: existingId },
      })
        .then(() => {
          throw new Error(UNEXPECTED_SUCCESS)
        })
        .catch(err => {
          expect(err.message).not.toBe(UNEXPECTED_SUCCESS)
          expect(err).toBeTruthy()
          expect(err.status).toBe(400)
        })
    })
    it('Fails with invalid id', () => {
      return makeTestCall({
        authToken,
        body: updateFullFormExample,
        operationId: 'updateIndividualGroup',
        pathParams: { id: '-1' },
      })
        .then(() => {
          throw new Error(UNEXPECTED_SUCCESS)
        })
        .catch(err => {
          expect(err.message).not.toBe(UNEXPECTED_SUCCESS)
          expect(err).toBeTruthy()
          expect(err.status).toBe(404)
        })
    })
  })
})
