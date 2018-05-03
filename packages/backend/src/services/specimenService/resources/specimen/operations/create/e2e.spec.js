const apiDescribe = require('../../../../../../utilities/test/apiDescribe')
const {
  makeTestCall,
} = require('../../../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../../../utilities/test/waitForApiRestart')
const expectSingleResourceResponse = require('../../../../../../utilities/test/expectSingleResourceResponse')
const expectError400 = require('../../../../../../utilities/test/expectError400')

const { getTestData } = require('../../testData')

const fullFormExample = require('./examples/normalizedRequestSuccess')

apiDescribe('specimen', () => {
  beforeAll(() => {
    return waitForApiRestart()
  })
  describe('create', () => {
    describe('base cases', () => {
      it('Succeed with full form example', () => {
        return makeTestCall({
          body: fullFormExample,
          operationId: 'specimenCreate',
        }).then(response => {
          expectSingleResourceResponse({
            expectedType: 'specimen',
            response,
          })
        })
      })
      it('Fails create with missing catalog number', () => {
        return expectError400(
          makeTestCall({
            body: getTestData('badRequestMissingCatalogNumber'),
            operationId: 'specimenCreate',
          })
        )
      })
    })
    describe('relations', () => {
      it('Succeed with simpleDataNoRelations and responseource are created with default relationships', () => {
        return makeTestCall({
          body: getTestData('simpleDataNoRelations'),
          operationId: 'specimenCreate',
        }).then(createdSpecimen => {
          return makeTestCall({
            operationId: 'specimenGetOne',
            pathParams: { id: createdSpecimen.data.id },
            queryParams: {
              relationships: ['all'],
            },
          }).then(response => {
            expectSingleResourceResponse({
              expectedType: 'specimen',
              relationships: {
                featureTypes: {
                  data: [],
                },

                physicalObjects: {
                  data: [],
                },
                places: { data: [] },
                taxa: {
                  data: [],
                },
              },
              response,
            })
          })
        })
      })
      it('Succeed with simpleDataPhysicalObjectRelations. Physical unit relationships are included in get response but not in create response', () => {
        const simpleDataPhysicalObjectRelations = getTestData(
          'simpleDataPhysicalObjectRelations'
        )
        return makeTestCall({
          body: simpleDataPhysicalObjectRelations,
          operationId: 'specimenCreate',
        })
          .then(response => {
            expectSingleResourceResponse({
              expectedType: 'specimen',
              relationships: false,
              response,
            })
            return response
          })
          .then(createdSpecimen => {
            return makeTestCall({
              operationId: 'specimenGetOne',
              pathParams: { id: createdSpecimen.data.id },
              queryParams: {
                relationships: ['all'],
              },
            }).then(response => {
              expectSingleResourceResponse({
                expectedType: 'specimen',
                relationships: {
                  ...simpleDataPhysicalObjectRelations.data.relationships,
                  featureTypes: {
                    data: [],
                  },
                  places: { data: [] },
                  taxa: {
                    data: [],
                  },
                },
                response,
              })
            })
          })
      })
      it('Succeed with simpleDataMultipleRelations. Multiple relationships are included in get response but not in create response', () => {
        const simpleDataMultipleRelations = getTestData(
          'simpleDataMultipleRelations'
        )
        return makeTestCall({
          body: simpleDataMultipleRelations,
          operationId: 'specimenCreate',
        })
          .then(response => {
            expectSingleResourceResponse({
              expectedType: 'specimen',
              relationships: false,
              response,
            })

            return response
          })
          .then(createdSpecimen => {
            return makeTestCall({
              operationId: 'specimenGetOne',
              pathParams: { id: createdSpecimen.data.id },
              queryParams: {
                relationships: ['all'],
              },
            }).then(response => {
              expectSingleResourceResponse({
                expectedType: 'specimen',
                relationships: simpleDataMultipleRelations.data.relationships,
                response,
              })
            })
          })
      })

      it('Fails with simpleDataInvalidRelations', () => {
        return expectError400(
          makeTestCall({
            body: getTestData('simpleDataInvalidRelations'),
            operationId: 'specimenCreate',
          })
        )
      })
      it('Fails with simpleDataInvalidRelationsFormat', () => {
        return expectError400(
          makeTestCall({
            body: getTestData('simpleDataInvalidRelationsFormat'),
            operationId: 'specimenCreate',
          })
        )
      })
    })
  })
})
