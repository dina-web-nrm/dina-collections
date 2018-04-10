const apiDescribe = require('../../../../../../utilities/test/apiDescribe')
const {
  makeTestCall,
} = require('../../../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../../../utilities/test/waitForApiRestart')
const expectError404 = require('../../../../../../utilities/test/expectError404')
const expectError400 = require('../../../../../../utilities/test/expectError400')
const expectSingleResourceResponse = require('../../../../../../utilities/test/expectSingleResourceResponse')

const fullFormExample = require('../create/examples/normalizedRequestSuccess.json')
const updateFullFormExample = require('./examples/requestSuccess.json')

const { getTestData } = require('../../testData')

apiDescribe('specimen', () => {
  beforeAll(() => {
    return waitForApiRestart()
  })

  describe('update', () => {
    describe('base cases', () => {
      let existingId
      beforeEach(() => {
        return makeTestCall({
          body: fullFormExample,
          operationId: 'createSpecimen',
        }).then(response => {
          expectSingleResourceResponse({
            expectedType: 'specimen',
            response,
          })
          existingId = response.data.id
        })
      })
      it('Succeed with valid individualGroup', () => {
        return makeTestCall({
          body: updateFullFormExample,
          operationId: 'updateSpecimen',
          pathParams: { id: existingId },
        }).then(response => {
          expect(response).toBeTruthy()
        })
      })
      it('Fails with missing body', () => {
        return expectError400(
          makeTestCall({
            operationId: 'updateSpecimen',
            pathParams: { id: existingId },
          })
        )
      })
      it('Fails with non existing id', () => {
        return expectError404(
          makeTestCall({
            body: updateFullFormExample,
            operationId: 'updateSpecimen',
            pathParams: { id: '-1' },
          })
        )
      })
    })
    describe('relation cases', () => {
      describe('existing physicalUnit relations', () => {
        let simpleDataPhysicalUnitRelationsId
        beforeEach(() => {
          return makeTestCall({
            body: getTestData('simpleDataPhysicalUnitRelations'),
            operationId: 'createSpecimen',
          }).then(response => {
            simpleDataPhysicalUnitRelationsId = response.data.id
          })
        })
        it('Dont modify relationships if relationships not updated', () => {
          const simpleDataPhysicalUnitRelations = getTestData(
            'simpleDataPhysicalUnitRelations'
          )
          const simpleDataPhysicalUnitRelationsWithoutRelations = getTestData(
            'simpleDataPhysicalUnitRelations'
          )
          delete simpleDataPhysicalUnitRelationsWithoutRelations.data
            .relationships
          return makeTestCall({
            body: simpleDataPhysicalUnitRelationsWithoutRelations,
            operationId: 'updateSpecimen',
            pathParams: { id: simpleDataPhysicalUnitRelationsId },
          })
            .then(() => {
              return makeTestCall({
                operationId: 'getSpecimen',
                pathParams: {
                  id: simpleDataPhysicalUnitRelationsId,
                },
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
                  ...simpleDataPhysicalUnitRelations.data.relationships,
                  taxa: {
                    data: [],
                  },
                },
                response,
              })
            })
        })

        it('Return empty array if relationships physicalUnits set to empty array', () => {
          const simpleDataPhysicalUnitRelationsWithEmptyRelations = getTestData(
            'simpleDataPhysicalUnitRelations'
          )
          simpleDataPhysicalUnitRelationsWithEmptyRelations.data.relationships = {
            physicalUnits: {
              data: [],
            },
          }
          return makeTestCall({
            body: simpleDataPhysicalUnitRelationsWithEmptyRelations,
            operationId: 'updateSpecimen',
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
                  taxa: {
                    data: [],
                  },
                },
                response,
              })
            })
        })

        it('Return update relationships if provided. Dont update non existing other relations', () => {
          const simpleDataPhysicalUnitRelationsWithEmptyRelations = getTestData(
            'simpleDataPhysicalUnitRelations'
          )
          simpleDataPhysicalUnitRelationsWithEmptyRelations.data.relationships = {
            featureObservationTypes: {
              data: [],
            },
            physicalUnits: {
              data: [{ id: '1234', type: 'physicalUnit' }],
            },
          }
          return makeTestCall({
            body: simpleDataPhysicalUnitRelationsWithEmptyRelations,
            operationId: 'updateSpecimen',
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
                    data: [{ id: '1234', type: 'physicalUnit' }],
                  },
                  taxa: {
                    data: [],
                  },
                },
                response,
              })
            })
        })
        it('Return update relationships if provided. Dont update existing other relations', () => {
          const simpleDataPhysicalUnitRelations = getTestData(
            'simpleDataPhysicalUnitRelations'
          )
          const simpleDataPhysicalUnitRelationsWithAddedFeatureObservationTypes = getTestData(
            'simpleDataPhysicalUnitRelations'
          )
          simpleDataPhysicalUnitRelationsWithAddedFeatureObservationTypes.data.relationships = {
            featureObservationTypes: {
              data: [
                {
                  id: '5555',
                  type: 'featureObservationType',
                },
              ],
            },
          }
          return makeTestCall({
            body: simpleDataPhysicalUnitRelationsWithAddedFeatureObservationTypes,
            operationId: 'updateSpecimen',
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
                    data: [
                      {
                        id: '5555',
                        type: 'featureObservationType',
                      },
                    ],
                  },
                  physicalUnits:
                    simpleDataPhysicalUnitRelations.data.relationships
                      .physicalUnits,
                  taxa: {
                    data: [],
                  },
                },
                response,
              })
            })
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
      it('Expect relationships to be default if not updated', () => {
        const simpleDataNoRelationsWithoutRelations = getTestData(
          'simpleDataNoRelations'
        )
        return makeTestCall({
          body: simpleDataNoRelationsWithoutRelations,
          operationId: 'updateSpecimen',
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
                  data: [],
                },
                taxa: {
                  data: [],
                },
              },
              response,
            })
          })
      })
      it('Return update relationships if provided', () => {
        const simpleDataNoRelationsWithEmptyRelations = getTestData(
          'simpleDataNoRelations'
        )
        simpleDataNoRelationsWithEmptyRelations.data.relationships = {
          physicalUnits: {
            data: [{ id: '1234', type: 'physicalUnit' }],
          },
        }

        return makeTestCall({
          body: simpleDataNoRelationsWithEmptyRelations,
          operationId: 'updateSpecimen',
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
                  data: [{ id: '1234', type: 'physicalUnit' }],
                },
                taxa: {
                  data: [],
                },
              },
              response,
            })
          })
      })
      it('Throws if wrong format of relationships provided', () => {
        const simpleDataNoRelationsWithEmptyRelations = getTestData(
          'simpleDataNoRelations'
        )
        simpleDataNoRelationsWithEmptyRelations.data.relationships = {
          physicalUnits: {
            data: [{ id: '1234', type: 'catUnit' }],
          },
        }

        return expectError400(
          makeTestCall({
            body: simpleDataNoRelationsWithEmptyRelations,
            operationId: 'updateSpecimen',
            pathParams: { id: simpleDataNoRelationsId },
          })
        )
      })
    })
  })
})
