const apiDescribe = require('../../../../../../utilities/test/apiDescribe')
const {
  makeTestCall,
} = require('../../../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../../../utilities/test/waitForApiRestart')
const expectError404 = require('../../../../../../utilities/test/expectError404')
const expectError400 = require('../../../../../../utilities/test/expectError400')
const expectSingleResourceResponse = require('../../../../../../utilities/test/expectSingleResourceResponse')
const expectMultipleResourcesResponse = require('../../../../../../utilities/test/expectMultipleResourcesResponse')

const { getTestData } = require('../../testData')

apiDescribe('specimen', () => {
  beforeAll(() => {
    return waitForApiRestart()
  })

  describe('updateSpecimenPhysicalUnits', () => {
    describe('existing relations', () => {
      let simpleDataPhysicalUnitRelationsId
      beforeEach(() => {
        return makeTestCall({
          body: getTestData('simpleDataPhysicalUnitRelations'),
          operationId: 'createSpecimen',
        }).then(response => {
          simpleDataPhysicalUnitRelationsId = response.data.id
        })
      })

      it('Update physicalUnits to empty array if set to empty array', () => {
        const emptyRelationships = {
          data: [],
        }
        return makeTestCall({
          body: emptyRelationships,
          operationId: 'updateSpecimenPhysicalUnits',
          pathParams: { id: simpleDataPhysicalUnitRelationsId },
        })
          .then(() => {
            return makeTestCall({
              operationId: 'getSpecimen',
              pathParams: { id: simpleDataPhysicalUnitRelationsId },
              queryParams: {
                relationships: ['all'],
              },
            })
          })
          .then(response => {
            expectSingleResourceResponse({
              expectedType: 'specimen',
              relationships: {
                curatedLocalities: { data: [] },
                featureObservationTypes: {
                  data: [],
                },
                physicalUnits: {
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
            operationId: 'updateSpecimenPhysicalUnits',
            pathParams: { id: '4433441' },
          })
        )
      })

      it('Return updated relationships if provided', () => {
        const newRelationships = {
          data: [{ id: '1337', type: 'physicalUnit' }],
        }
        return makeTestCall({
          body: newRelationships,
          operationId: 'updateSpecimenPhysicalUnits',
          pathParams: { id: simpleDataPhysicalUnitRelationsId },
        })
          .then(response => {
            expectMultipleResourcesResponse({
              expectedType: 'physicalUnit',
              response,
            })
            expect(response.data).toEqual([
              { attributes: {}, id: '1337', type: 'physicalUnit' },
            ])

            return makeTestCall({
              operationId: 'getSpecimen',
              pathParams: { id: simpleDataPhysicalUnitRelationsId },
              queryParams: {
                relationships: ['all'],
              },
            })
          })
          .then(response => {
            expect(response).toBeTruthy()
            expect(response.data).toBeTruthy()
            expect(response.data.relationships.physicalUnits.data).toEqual([
              { id: '1337', type: 'physicalUnit' },
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
            operationId: 'updateSpecimenPhysicalUnits',
            pathParams: { id: simpleDataPhysicalUnitRelationsId },
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
        operationId: 'createSpecimen',
      }).then(response => {
        simpleDataNoRelationsId = response.data.id
      })
    })
    it('Return update relationships if provided', () => {
      const newRelationships = {
        data: [{ id: '1337', type: 'physicalUnit' }],
      }
      return makeTestCall({
        body: newRelationships,
        operationId: 'updateSpecimenPhysicalUnits',
        pathParams: { id: simpleDataNoRelationsId },
      })
        .then(() => {
          return makeTestCall({
            operationId: 'getSpecimen',
            pathParams: { id: simpleDataNoRelationsId },
            queryParams: {
              relationships: ['all'],
            },
          })
        })
        .then(response => {
          expectSingleResourceResponse({
            expectedType: 'specimen',
            relationships: {
              curatedLocalities: { data: [] },
              featureObservationTypes: {
                data: [],
              },
              physicalUnits: {
                data: [{ id: '1337', type: 'physicalUnit' }],
              },
            },
            response,
          })
        })
    })
  })
})
