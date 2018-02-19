const apiDescribe = require('../../../../utilities/test/apiDescribe')
const { makeTestCall } = require('../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../utilities/test/waitForApiRestart')
const { fullFormExample } = require('../../testData/individualGroup')

const validCatalogNumber = '123456'
const validTaxonName = 'Chironectes minimus'

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
      it('Succeed with valid catalogNumber and includes', () => {
        return makeTestCall({
          authToken,
          operationId: 'getIndividualGroups',
          queryParams: {
            'filter[catalogNumber]': validCatalogNumber,
            include: 'identifications,physicalUnits.catalogedUnit',
          },
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
      it('Succeed with valid identifiedTaxonNameStandardized and includes', () => {
        return makeTestCall({
          authToken,
          operationId: 'getIndividualGroups',
          queryParams: {
            'filter[identifiedTaxonNameStandardized]': validTaxonName,
            include: 'identifications,physicalUnits.catalogedUnit',
          },
        }).then(res => {
          expect(res).toBeTruthy()
          expect(res.data).toBeTruthy()
          expect(Array.isArray(res.data)).toBe(true)
          expect(res.data.length > 0).toBe(true)
        })
      })
    })
  })
})
