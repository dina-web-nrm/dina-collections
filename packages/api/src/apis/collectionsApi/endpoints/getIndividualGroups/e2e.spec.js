const apiDescribe = require('../../../../utilities/test/apiDescribe')
const { makeTestCall } = require('../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../utilities/test/waitForApiRestart')
const { fullFormExample } = require('../../testData/individualGroup')

const validCatalogNumber = '123456'
const validTaxonName = 'Chironectes minimus'
const invalidCatalogNumber = 'Some catalogNumber'
const invalidTaxonName = 'Some taxa'

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

  describe('getIndividualGroups', () => {
    beforeEach(() => {
      return makeTestCall({
        authToken,
        body: fullFormExample,
        operationId: 'createIndividualGroup',
      })
    })
    describe('by catalogNumber', () => {
      it('Succeed with valid catalogNumber', () => {
        return makeTestCall({
          authToken,
          operationId: 'getIndividualGroups',
          queryParams: { 'filter[catalogNumber]': validCatalogNumber },
        }).then(res => {
          expect(res).toBeTruthy()
          expect(res.data).toBeTruthy()
          expect(Array.isArray(res.data)).toBe(true)
          expect(res.data.length > 0).toBe(true)
        })
      })
    })
    describe('by identifiedTaxonNameStandardized', () => {
      it('Succeed with valid identifiedTaxonNameStandardized', () => {
        return makeTestCall({
          authToken,
          operationId: 'getIndividualGroups',
          queryParams: {
            'filter[identifiedTaxonNameStandardized]': validTaxonName,
          },
        }).then(res => {
          expect(res).toBeTruthy()
          expect(res.data).toBeTruthy()
          expect(Array.isArray(res.data)).toBe(true)
          expect(res.data.length > 0).toBe(true)
        })
      })
    })
    describe('by invalid catalogNumber', () => {
      it('Return empty array with invalid catalogNumber', () => {
        return makeTestCall({
          authToken,
          operationId: 'getIndividualGroups',
          queryParams: {
            'filter[catalogNumber]': invalidCatalogNumber,
          },
        }).then(res => {
          expect(res).toBeTruthy()
          expect(res.data.length).toBe(0)
        })
      })
    })
    describe('by invalid identifiedTaxonNameStandardized', () => {
      it('Return empty array with invalid identifiedTaxonNameStandardized', () => {
        return makeTestCall({
          authToken,
          operationId: 'getIndividualGroups',
          queryParams: {
            'filter[identifiedTaxonNameStandardized]': invalidTaxonName,
          },
        }).then(res => {
          expect(res).toBeTruthy()
          expect(res.data.length).toBe(0)
        })
      })
    })
  })
})
