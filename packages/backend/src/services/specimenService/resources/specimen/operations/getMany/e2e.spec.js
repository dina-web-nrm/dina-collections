const apiDescribe = require('../../../../../../utilities/test/apiDescribe')
const {
  makeTestCall,
} = require('../../../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../../../utilities/test/waitForApiRestart')

const fullFormExample = require('../create/examples/fullFormExample.json')

const validCatalogNumber = '123456'
const validTaxonName = 'Sorex minutus'

apiDescribe('specimen', () => {
  let authToken
  beforeAll(() => {
    return waitForApiRestart().then(() => {
      authToken = 1234
    })
  })

  describe('getSpecimens', () => {
    beforeEach(() => {
      return makeTestCall({
        authToken,
        body: fullFormExample,
        operationId: 'createSpecimen',
      })
    })
    describe('by catalogNumber', () => {
      it('Succeed with valid catalogNumber', () => {
        return makeTestCall({
          authToken,
          operationId: 'getSpecimens',
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
          operationId: 'getSpecimens',
          queryParams: {
            'filter[catalogNumber]': validCatalogNumber,
          },
        }).then(res => {
          expect(res).toBeTruthy()
          expect(res.data).toBeTruthy()
          expect(Array.isArray(res.data)).toBe(true)
          expect(res.data.length > 0).toBe(true)
        })
      })
      it('Return empty array when non existing catalogNumber', () => {
        return makeTestCall({
          authToken,
          operationId: 'getSpecimens',
          queryParams: {
            'filter[catalogNumber]': 'xxx111',
          },
        }).then(res => {
          expect(res).toBeTruthy()
          expect(res.data).toBeTruthy()
          expect(Array.isArray(res.data)).toBe(true)
          expect(res.data.length === 0).toBe(true)
        })
      })
    })
    describe('by taxonNameStandardized', () => {
      it('Succeed with valid taxonNameStandardized', () => {
        return makeTestCall({
          authToken,
          operationId: 'getSpecimens',
          queryParams: {
            'filter[taxonNameStandardized]': validTaxonName,
          },
        }).then(res => {
          expect(res).toBeTruthy()
          expect(res.data).toBeTruthy()
          expect(Array.isArray(res.data)).toBe(true)
          expect(res.data.length > 0).toBe(true)
        })
      })
      it('Succeed with valid taxonNameStandardized', () => {
        return makeTestCall({
          authToken,
          operationId: 'getSpecimens',
          queryParams: {
            'filter[taxonNameStandardized]': validTaxonName,
          },
        }).then(res => {
          expect(res).toBeTruthy()
          expect(res.data).toBeTruthy()
          expect(Array.isArray(res.data)).toBe(true)
          expect(res.data.length > 0).toBe(true)
        })
      })
      it('Return empty array when taxon name dont exist', () => {
        return makeTestCall({
          authToken,
          operationId: 'getSpecimens',
          queryParams: {
            'filter[taxonNameStandardized]': 'not-existing',
          },
        }).then(res => {
          expect(res).toBeTruthy()
          expect(res.data).toBeTruthy()
          expect(Array.isArray(res.data)).toBe(true)
          expect(res.data.length === 0).toBe(true)
        })
      })
    })
  })
})
