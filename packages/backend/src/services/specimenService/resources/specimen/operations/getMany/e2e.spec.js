const apiDescribe = require('../../../../../../utilities/test/apiDescribe')
const {
  makeTestCall,
} = require('../../../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../../../utilities/test/waitForApiRestart')
const expectMultipleResourcesResponse = require('../../../../../../utilities/test/expectMultipleResourcesResponse')

const fullFormExample = require('../create/examples/normalizedRequestSuccess.json')
const { getTestData } = require('../../testData')

const validCatalogNumber = '123456'
// const validTaxonName = 'Sorex minutus'

apiDescribe('specimen', () => {
  beforeAll(() => {
    return waitForApiRestart()
  })

  describe('get', () => {
    beforeEach(() => {
      return makeTestCall({
        body: fullFormExample,
        operationId: 'createSpecimen',
      })
    })
    describe('by catalogNumber', () => {
      it('Succeed with valid catalogNumber', () => {
        return makeTestCall({
          operationId: 'getSpecimens',
          queryParams: { 'filter[catalogNumber]': validCatalogNumber },
        }).then(response => {
          expectMultipleResourcesResponse({
            expectedType: 'specimen',
            expectLength: true,
            response,
          })
        })
      })
      it('Succeed with valid catalogNumber', () => {
        return makeTestCall({
          operationId: 'getSpecimens',
          queryParams: {
            'filter[catalogNumber]': validCatalogNumber,
          },
        }).then(response => {
          expectMultipleResourcesResponse({
            expectedType: 'specimen',
            expectLength: true,
            response,
          })
        })
      })
      it('Return empty array when non existing catalogNumber', () => {
        return makeTestCall({
          operationId: 'getSpecimens',
          queryParams: {
            'filter[catalogNumber]': 'xxx111',
          },
        }).then(response => {
          expectMultipleResourcesResponse({
            expectedLength: 0,
            expectedType: 'specimen',
            response,
          })
        })
      })
    })
    // describe('by taxonNameStandardized', () => {
    //   it('Succeed with valid taxonNameStandardized', () => {
    //     return makeTestCall({
    //       operationId: 'getSpecimens',
    //       queryParams: {
    //         'filter[taxonNameStandardized]': validTaxonName,
    //       },
    //     }).then(response => {
    //       expectMultipleResourcesResponse({
    //         expectedType: 'specimen',
    //         expectLength: true,
    //         response,
    //       })
    //     })
    //   })
    //   it('Succeed with valid taxonNameStandardized', () => {
    //     return makeTestCall({
    //       operationId: 'getSpecimens',
    //       queryParams: {
    //         'filter[taxonNameStandardized]': validTaxonName,
    //       },
    //     }).then(response => {
    //       expectMultipleResourcesResponse({
    //         expectedType: 'specimen',
    //         expectLength: true,
    //         response,
    //       })
    //     })
    //   })
    //   it('Return empty array when taxon name dont exist', () => {
    //     return makeTestCall({
    //       operationId: 'getSpecimens',
    //       queryParams: {
    //         'filter[taxonNameStandardized]': 'not-existing',
    //       },
    //     }).then(response => {
    //       expectMultipleResourcesResponse({
    //         expectedLength: 0,
    //         expectedType: 'specimen',
    //         response,
    //       })
    //     })
    //   })
    // })
    describe('relation cases', () => {
      beforeAll(() => {
        const modifiedSimpleDataRelations = getTestData(
          'simpleDataPhysicalUnitRelations'
        )
        modifiedSimpleDataRelations.data.attributes.identifiers[0].identifier.value =
          '555112'

        return makeTestCall({
          body: modifiedSimpleDataRelations,
          operationId: 'createSpecimen',
        })
      })
      it('Succeed with simpleDataPhysicalUnitRelations', () => {
        const simpleDataPhysicalUnitRelations = getTestData(
          'simpleDataPhysicalUnitRelations'
        )
        return makeTestCall({
          operationId: 'getSpecimens',
          queryParams: {
            'filter[catalogNumber]': '555112',
            limit: 1,
            relationships: ['physicalUnits'],
          },
        }).then(response => {
          expectMultipleResourcesResponse({
            expectedLength: 1,
            expectedType: 'specimen',
            response,
          })
          expect(response.data[0].type).toBe('specimen')
          expect(response.data[0].attributes).toBeTruthy()
          expect(response.data[0].relationships).toBeTruthy()
          expect(response.data[0].relationships).toEqual(
            simpleDataPhysicalUnitRelations.data.relationships
          )
        })
      })
    })
  })
})
