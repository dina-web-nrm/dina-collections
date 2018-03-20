const apiDescribe = require('../../../../../../utilities/test/apiDescribe')
const {
  makeTestCall,
} = require('../../../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../../../utilities/test/waitForApiRestart')
const expectError404 = require('../../../../../../utilities/test/expectError404')
const expectMultipleResourcesResponse = require('../../../../../../utilities/test/expectMultipleResourcesResponse')

const { getTestData } = require('../../testData')

apiDescribe('specimen', () => {
  beforeAll(() => {
    return waitForApiRestart()
  })

  describe('getSpecimenPhysicalUnits', () => {
    describe('existing relations', () => {
      let simpleDataPhysicalUnitRelationsId
      beforeAll(() => {
        return makeTestCall({
          body: getTestData('simpleDataPhysicalUnitRelations'),
          operationId: 'createSpecimen',
        }).then(response => {
          simpleDataPhysicalUnitRelationsId = response.data.id
        })
      })
      it('Succeed fetch simpleDataPhysicalUnitRelations', () => {
        const simpleDataPhysicalUnitRelations = getTestData(
          'simpleDataPhysicalUnitRelations'
        )
        return makeTestCall({
          operationId: 'getSpecimenPhysicalUnits',
          pathParams: {
            id: simpleDataPhysicalUnitRelationsId,
          },
        }).then(response => {
          expectMultipleResourcesResponse({
            expectedType: 'physicalUnit',
            expectLength: true,
            response,
          })

          expect(response.data[0].id).toBe(
            simpleDataPhysicalUnitRelations.data.relationships.physicalUnits
              .data[0].id
          )
          expect(response.data[0].type).toBe('physicalUnit')
          expect(response.data[0].attributes).toBeTruthy()
        })
      })
      it('Fail fetch with 404 when non existing id provided', () => {
        return expectError404(
          makeTestCall({
            operationId: 'getSpecimenPhysicalUnits',
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
          operationId: 'createSpecimen',
        }).then(response => {
          simpleDataNoRelationsId = response.data.id
        })
      })
      it('Return empty array when no physicalUnits exist', () => {
        return makeTestCall({
          operationId: 'getSpecimenPhysicalUnits',
          pathParams: {
            id: simpleDataNoRelationsId,
          },
        }).then(response => {
          expectMultipleResourcesResponse({
            expectedLength: 0,
            expectedType: 'physicalUnit',
            response,
          })
        })
      })
    })
  })
})
