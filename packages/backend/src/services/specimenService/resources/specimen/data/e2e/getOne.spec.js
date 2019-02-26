const apiDescribe = require('common/src/testUtilities/backendApiDescribe')
const {
  makeTestCall,
} = require('../../../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../../../utilities/test/waitForApiRestart')
const expectSingleResourceResponse = require('../../../../../../utilities/test/expectSingleResourceResponse')
const expectError404 = require('../../../../../../utilities/test/expectError404')

const { getTestData } = require('../testData')

apiDescribe('specimen', () => {
  describe.skip('deactivated', () => {
    beforeAll(() => {
      return waitForApiRestart()
    })

    describe('getOne', () => {
      describe('base cases', () => {
        let simpleDataNoRelationsId
        beforeAll(() => {
          return makeTestCall({
            body: getTestData('simpleDataNoRelations'),
            flushModels: ['catalogNumber'],
            operationId: 'specimenCreate',
          }).then(response => {
            simpleDataNoRelationsId = response.data.id
          })
        })
        it('Succeed fetch simpleDataNoRelations', () => {
          return makeTestCall({
            operationId: 'specimenGetOne',
            pathParams: {
              id: simpleDataNoRelationsId,
            },
          }).then(response => {
            expectSingleResourceResponse({
              expectedId: simpleDataNoRelationsId,
              expectedType: 'specimen',
              response,
            })
          })
        })
        it('Fail fetch with 404 when non existing id provided', () => {
          return expectError404(
            makeTestCall({
              operationId: 'specimenGetOne',
              pathParams: {
                id: '17171717',
              },
            })
          )
        })
      })
      describe('relation cases', () => {
        describe('existing relations', () => {
          let simpleDataPhysicalObjectRelationsId
          const simpleDataPhysicalObjectRelations = getTestData(
            'simpleDataPhysicalObjectRelations'
          )
          beforeAll(() => {
            return makeTestCall({
              body: getTestData('simpleDataPhysicalObjectRelations'),
              flushModels: ['catalogNumber'],
              operationId: 'specimenCreate',
            }).then(response => {
              simpleDataPhysicalObjectRelationsId = response.data.id
            })
          })
          it('Fetch resource with physical object relationships', () => {
            return makeTestCall({
              operationId: 'specimenGetOne',
              pathParams: {
                id: simpleDataPhysicalObjectRelationsId,
              },
              queryParams: {
                relationships: ['physicalObjects'],
              },
            }).then(response => {
              expectSingleResourceResponse({
                expectedId: simpleDataPhysicalObjectRelationsId,
                expectedType: 'specimen',
                relationships: {
                  physicalObjects: {
                    ...simpleDataPhysicalObjectRelations.data.relationships
                      .physicalObjects,
                  },
                },
                response,
              })
            })
          })
        })
        describe('existing relations dont include relationships if not in query', () => {
          let simpleDataPhysicalObjectRelationsId
          beforeAll(() => {
            return makeTestCall({
              body: getTestData('simpleDataPhysicalObjectRelations'),
              flushModels: ['catalogNumber'],
              operationId: 'specimenCreate',
            }).then(response => {
              simpleDataPhysicalObjectRelationsId = response.data.id
            })
          })
          it('Fetch resource with physical unit relationships', () => {
            return makeTestCall({
              operationId: 'specimenGetOne',
              pathParams: {
                id: simpleDataPhysicalObjectRelationsId,
              },
            }).then(response => {
              expectSingleResourceResponse({
                expectedId: simpleDataPhysicalObjectRelationsId,
                expectedType: 'specimen',
                relationships: {},
                response,
              })
            })
          })
        })
        describe('existing relations only include specific relationships if in query', () => {
          let simpleDataPhysicalObjectRelationsId
          beforeAll(() => {
            return makeTestCall({
              body: getTestData('simpleDataPhysicalObjectRelations'),
              flushModels: ['catalogNumber'],
              operationId: 'specimenCreate',
            }).then(response => {
              simpleDataPhysicalObjectRelationsId = response.data.id
            })
          })
          it('Fetch resource with physical unit relationships', () => {
            return makeTestCall({
              operationId: 'specimenGetOne',
              pathParams: {
                id: simpleDataPhysicalObjectRelationsId,
              },
              queryParams: {
                relationships: ['places'],
              },
            }).then(response => {
              expectSingleResourceResponse({
                expectedId: simpleDataPhysicalObjectRelationsId,
                expectedType: 'specimen',
                relationships: {
                  places: {
                    data: [],
                  },
                },
                response,
              })
            })
          })
        })

        describe('no existing relations', () => {
          let simpleDataNoRelationsId
          beforeAll(() => {
            return makeTestCall({
              body: getTestData('simpleDataNoRelations'),
              flushModels: ['catalogNumber'],
              operationId: 'specimenCreate',
            }).then(response => {
              simpleDataNoRelationsId = response.data.id
            })
          })
          it('Fetch resource with default relationships', () => {
            return makeTestCall({
              operationId: 'specimenGetOne',

              pathParams: {
                id: simpleDataNoRelationsId,
              },
              queryParams: {
                relationships: ['all'],
              },
            }).then(response => {
              expectSingleResourceResponse({
                expectedId: simpleDataNoRelationsId,
                expectedType: 'specimen',
                relationships: {
                  ...getTestData('initialRelationships'),
                },
                response,
              })
            })
          })
        })
      })
    })
  })
})
