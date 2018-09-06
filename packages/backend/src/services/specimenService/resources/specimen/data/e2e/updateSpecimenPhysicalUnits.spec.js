const apiDescribe = require('../../../../../../utilities/test/apiDescribe')
const {
  makeTestCall,
} = require('../../../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../../../utilities/test/waitForApiRestart')
const expectError404 = require('../../../../../../utilities/test/expectError404')
const expectError400 = require('../../../../../../utilities/test/expectError400')
const expectSingleResourceResponse = require('../../../../../../utilities/test/expectSingleResourceResponse')
const expectMultipleResourcesResponse = require('../../../../../../utilities/test/expectMultipleResourcesResponse')

const { getTestData } = require('../testData')

apiDescribe('specimen', () => {
  beforeAll(() => {
    return waitForApiRestart()
  })

  describe('updateSpecimenPhysicalObjects', () => {
    describe('existing relations', () => {
      let simpleDataPhysicalObjectRelationsId
      beforeEach(() => {
        return makeTestCall({
          body: getTestData('simpleDataPhysicalObjectRelations'),
          operationId: 'specimenCreate',
        }).then(response => {
          simpleDataPhysicalObjectRelationsId = response.data.id
        })
      })

      it('Update physicalObjects to empty array if set to empty array', () => {
        const emptyRelationships = {
          data: [],
        }
        return makeTestCall({
          body: emptyRelationships,
          operationId: 'specimenUpdateRelationshipPhysicalObjects',
          pathParams: { id: simpleDataPhysicalObjectRelationsId },
        })
          .then(() => {
            return makeTestCall({
              operationId: 'specimenGetOne',
              pathParams: { id: simpleDataPhysicalObjectRelationsId },
              queryParams: {
                relationships: [
                  'featureTypes',
                  'normalizedAgents',
                  'physicalObjects',
                  'places',
                  'taxonNames',
                ],
              },
            })
          })
          .then(response => {
            expectSingleResourceResponse({
              expectedType: 'specimen',
              relationships: {
                featureTypes: {
                  data: [],
                },
                normalizedAgents: {
                  data: [],
                },
                physicalObjects: {
                  data: [],
                },
                places: { data: [] },
                taxonNames: {
                  data: [],
                },
              },
              response,
            })
          })
      })
      it('Fails with 404 if specimen dont exist', () => {
        const emptyRelationships = {
          data: [],
        }
        return expectError404(
          makeTestCall({
            body: emptyRelationships,
            operationId: 'specimenUpdateRelationshipPhysicalObjects',
            pathParams: { id: '4433441' },
          })
        )
      })

      it('Return updated relationships if provided', () => {
        const newRelationships = {
          data: [{ id: '1337', type: 'physicalObject' }],
        }
        return makeTestCall({
          body: newRelationships,
          operationId: 'specimenUpdateRelationshipPhysicalObjects',
          pathParams: { id: simpleDataPhysicalObjectRelationsId },
        })
          .then(response => {
            expectMultipleResourcesResponse({
              expectedType: 'physicalObject',
              response,
            })
            expect(response.data).toEqual([
              { id: '1337', type: 'physicalObject' },
            ])

            return makeTestCall({
              operationId: 'specimenGetOne',
              pathParams: { id: simpleDataPhysicalObjectRelationsId },
              queryParams: {
                relationships: [
                  'featureTypes',
                  'normalizedAgents',
                  'physicalObjects',
                  'places',
                  'taxonNames',
                ],
              },
            })
          })
          .then(response => {
            expect(response).toBeTruthy()
            expect(response.data).toBeTruthy()
            expect(response.data.relationships.physicalObjects.data).toEqual([
              { id: '1337', type: 'physicalObject' },
            ])
          })
      })
      it('Throw error 400 if trying to update relationship with wrong type', () => {
        const newRelationships = {
          data: [{ id: '1337', type: 'specimen' }],
        }
        return expectError400(
          makeTestCall({
            body: newRelationships,
            operationId: 'specimenUpdateRelationshipPhysicalObjects',
            pathParams: { id: simpleDataPhysicalObjectRelationsId },
          })
        )
      })
    })
  })
  describe('no existing relations', () => {
    let simpleDataNoRelationsId
    beforeEach(() => {
      return makeTestCall({
        body: getTestData('simpleDataNoRelations'),
        operationId: 'specimenCreate',
      }).then(response => {
        simpleDataNoRelationsId = response.data.id
      })
    })
    it('Return update relationships if provided', () => {
      const newRelationships = {
        data: [{ id: '1337', type: 'physicalObject' }],
      }
      return makeTestCall({
        body: newRelationships,
        operationId: 'specimenUpdateRelationshipPhysicalObjects',
        pathParams: { id: simpleDataNoRelationsId },
      })
        .then(() => {
          return makeTestCall({
            operationId: 'specimenGetOne',
            pathParams: { id: simpleDataNoRelationsId },
            queryParams: {
              relationships: [
                'featureTypes',
                'normalizedAgents',
                'physicalObjects',
                'places',
                'taxonNames',
              ],
            },
          })
        })
        .then(response => {
          expectSingleResourceResponse({
            expectedType: 'specimen',
            relationships: {
              featureTypes: {
                data: [],
              },
              normalizedAgents: {
                data: [],
              },
              physicalObjects: {
                data: [{ id: '1337', type: 'physicalObject' }],
              },
              places: { data: [] },
              taxonNames: {
                data: [],
              },
            },
            response,
          })
        })
    })
  })
})
