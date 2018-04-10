const apiDescribe = require('../../../../../../utilities/test/apiDescribe')
const {
  makeTestCall,
} = require('../../../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../../../utilities/test/waitForApiRestart')
const expectSingleResourceResponse = require('../../../../../../utilities/test/expectSingleResourceResponse')
const expectError404 = require('../../../../../../utilities/test/expectError404')

const { getTestData } = require('../../testData')

apiDescribe('specimen', () => {
  beforeAll(() => {
    return waitForApiRestart()
  })

  describe('getOne', () => {
    describe('base cases', () => {
      let simpleDataNoRelationsId
      beforeAll(() => {
        return makeTestCall({
          body: getTestData('simpleDataNoRelations'),
          operationId: 'createSpecimen',
        }).then(response => {
          simpleDataNoRelationsId = response.data.id
        })
      })
      it('Succeed fetch simpleDataNoRelations', () => {
        return makeTestCall({
          operationId: 'getSpecimen',
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
            operationId: 'getSpecimen',
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
            operationId: 'createSpecimen',
          }).then(response => {
            simpleDataPhysicalObjectRelationsId = response.data.id
          })
        })
        it('Fetch resource with physical unit relationships', () => {
          return makeTestCall({
            operationId: 'getSpecimen',
            pathParams: {
              id: simpleDataPhysicalObjectRelationsId,
            },
            queryParams: {
              relationships: ['all'],
            },
          }).then(response => {
            expectSingleResourceResponse({
              expectedId: simpleDataPhysicalObjectRelationsId,
              expectedType: 'specimen',
              relationships: {
                curatedLocalities: { data: [] },
                featureTypes: {
                  data: [],
                },
                ...simpleDataPhysicalObjectRelations.data.relationships,
                taxa: {
                  data: [],
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
            operationId: 'createSpecimen',
          }).then(response => {
            simpleDataPhysicalObjectRelationsId = response.data.id
          })
        })
        it('Fetch resource with physical unit relationships', () => {
          return makeTestCall({
            operationId: 'getSpecimen',
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
            operationId: 'createSpecimen',
          }).then(response => {
            simpleDataPhysicalObjectRelationsId = response.data.id
          })
        })
        it('Fetch resource with physical unit relationships', () => {
          return makeTestCall({
            operationId: 'getSpecimen',
            pathParams: {
              id: simpleDataPhysicalObjectRelationsId,
            },
            queryParams: {
              relationships: ['curatedLocalities'],
            },
          }).then(response => {
            expectSingleResourceResponse({
              expectedId: simpleDataPhysicalObjectRelationsId,
              expectedType: 'specimen',
              relationships: {
                curatedLocalities: {
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
            operationId: 'createSpecimen',
          }).then(response => {
            simpleDataNoRelationsId = response.data.id
          })
        })
        it('Fetch resource with default relationships', () => {
          return makeTestCall({
            operationId: 'getSpecimen',

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
                curatedLocalities: { data: [] },
                featureTypes: {
                  data: [],
                },
                physicalObjects: {
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
      })
    })
  })
})
