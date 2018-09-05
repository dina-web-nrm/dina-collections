const apiDescribe = require('../../../../../../utilities/test/apiDescribe')
const {
  makeTestCall,
} = require('../../../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../../../utilities/test/waitForApiRestart')
const expectError404 = require('../../../../../../utilities/test/expectError404')
const expectMultipleResourcesResponse = require('../../../../../../utilities/test/expectMultipleResourcesResponse')

const { getTestData } = require('../testData')

apiDescribe('specimen', () => {
  beforeAll(() => {
    return waitForApiRestart()
  })

  describe('getSpecimenPhysicalObjects', () => {
    describe('existing relations', () => {
      let simpleDataPhysicalObjectRelationsId
      beforeAll(() => {
        return makeTestCall({
          body: getTestData('simpleDataPhysicalObjectRelations'),
          operationId: 'specimenCreate',
        }).then(response => {
          simpleDataPhysicalObjectRelationsId = response.data.id
        })
      })
      it('Succeed fetch simpleDataPhysicalObjectRelations', () => {
        const simpleDataPhysicalObjectRelations = getTestData(
          'simpleDataPhysicalObjectRelations'
        )
        return makeTestCall({
          operationId: 'specimenGetRelationshipPhysicalObjects',
          pathParams: {
            id: simpleDataPhysicalObjectRelationsId,
          },
        }).then(response => {
          expectMultipleResourcesResponse({
            expectedType: 'physicalObject',
            expectLength: true,
            response,
          })
          expect(response.data[0].id).toBe(
            simpleDataPhysicalObjectRelations.data.relationships.physicalObjects
              .data[0].id
          )
          expect(response.data[0].type).toBe('physicalObject')
        })
      })
      it('Fail fetch with 404 when non existing id provided', () => {
        return expectError404(
          makeTestCall({
            operationId: 'specimenGetRelationshipPhysicalObjects',
            pathParams: {
              id: '17171717',
            },
          })
        )
      })
    })

    describe('no existing relations', () => {
      let simpleDataNoRelationsId
      beforeAll(() => {
        return makeTestCall({
          body: getTestData('simpleDataNoRelations'),
          operationId: 'specimenCreate',
        }).then(response => {
          simpleDataNoRelationsId = response.data.id
        })
      })
      it('Return empty array when no physicalObjects exist', () => {
        return makeTestCall({
          operationId: 'specimenGetRelationshipPhysicalObjects',
          pathParams: {
            id: simpleDataNoRelationsId,
          },
        }).then(response => {
          expectMultipleResourcesResponse({
            expectedLength: 0,
            expectedType: 'physicalObject',
            response,
          })
        })
      })
    })
  })
})
