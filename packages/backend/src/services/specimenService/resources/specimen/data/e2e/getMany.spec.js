const apiDescribe = require('../../../../../../utilities/test/apiDescribe')
const {
  makeTestCall,
} = require('../../../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../../../utilities/test/waitForApiRestart')
const expectMultipleResourcesResponse = require('../../../../../../utilities/test/expectMultipleResourcesResponse')

const fullFormExample = require('../exampleRequests/createSuccess')
const { getTestData } = require('../testData')

const validCatalogNumber = '123456'

apiDescribe('specimen', () => {
  beforeAll(() => {
    return waitForApiRestart()
  })

  describe('get', () => {
    beforeEach(() => {
      return makeTestCall({
        body: fullFormExample,
        flushModels: ['catalogNumber'],
        operationId: 'specimenCreate',
      })
    })
    describe('by catalogNumber', () => {
      it('Succeed with valid catalogNumber', () => {
        return makeTestCall({
          operationId: 'specimenGetMany',
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
          operationId: 'specimenGetMany',
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
          operationId: 'specimenGetMany',
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
    describe('relation cases', () => {
      beforeAll(() => {
        const modifiedSimpleDataRelations = getTestData(
          'simpleDataPhysicalObjectRelations'
        )
        modifiedSimpleDataRelations.data.attributes.normalized.identifiers[0].value =
          '555112'

        return makeTestCall({
          body: modifiedSimpleDataRelations,
          flushModels: ['catalogNumber'],
          operationId: 'specimenCreate',
        })
      })
      it('Succeed with simpleDataPhysicalObjectRelations', () => {
        const simpleDataPhysicalObjectRelations = getTestData(
          'simpleDataPhysicalObjectRelations'
        )
        return makeTestCall({
          operationId: 'specimenGetMany',
          queryParams: {
            'filter[catalogNumber]': '555112',
            limit: 1,
            relationships: ['physicalObjects'],
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
            simpleDataPhysicalObjectRelations.data.relationships
          )
        })
      })
    })
  })
})
