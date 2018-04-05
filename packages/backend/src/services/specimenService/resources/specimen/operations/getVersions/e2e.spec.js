const apiDescribe = require('../../../../../../utilities/test/apiDescribe')
const {
  makeTestCall,
} = require('../../../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../../../utilities/test/waitForApiRestart')
const expectError404 = require('../../../../../../utilities/test/expectError404')
const expectMultipleResourcesResponse = require('../../../../../../utilities/test/expectMultipleResourcesResponse')
const expectSingleResourceResponse = require('../../../../../../utilities/test/expectSingleResourceResponse')

const { getTestData } = require('../../testData')

apiDescribe('specimen', () => {
  beforeAll(() => {
    return waitForApiRestart()
  })

  describe('getVersion', () => {
    describe('base cases', () => {
      let existingId
      let firstFetchedId
      let secondFetchedId
      beforeAll(() => {
        return makeTestCall({
          body: getTestData('simpleDataNoRelations'),
          operationId: 'createSpecimen',
        }).then(response => {
          const updatedSimpleDataNoRelations = getTestData(
            'simpleDataNoRelations'
          )
          updatedSimpleDataNoRelations.data.attributes.identifiers[0].identifier.value =
            '555555'

          existingId = response.data.id
          return makeTestCall({
            body: updatedSimpleDataNoRelations,
            operationId: 'updateSpecimen',
            pathParams: { id: existingId },
          })
        })
      })

      it('Fetches 2 versions', () => {
        return makeTestCall({
          operationId: 'getSpecimenVersions',
          pathParams: { id: existingId },
        }).then(response => {
          expectMultipleResourcesResponse({
            expectedLength: 2,
            expectedType: 'specimen',
            response,
          })

          expect(response.data[0].id).toBeTruthy()
          expect(response.data[1].id).toBeTruthy()
          firstFetchedId = response.data[0].id
          secondFetchedId = response.data[1].id
        })
      })
      it('First version fetched by id', () => {
        return makeTestCall({
          operationId: 'getSpecimenVersion',
          pathParams: { id: existingId, versionId: firstFetchedId },
        }).then(response => {
          expectSingleResourceResponse({
            expectedId: firstFetchedId,
            expectedType: 'specimen',
            response,
          })
        })
      })
      it('Second version fetched by id', () => {
        return makeTestCall({
          operationId: 'getSpecimenVersion',
          pathParams: { id: existingId, versionId: secondFetchedId },
        }).then(response => {
          expectSingleResourceResponse({
            expectedId: secondFetchedId,
            expectedType: 'specimen',
            response,
          })
        })
      })
      it('getSpecimenVersions for non existing speciment result in 404', () => {
        return expectError404(
          makeTestCall({
            operationId: 'getSpecimenVersions',
            pathParams: { id: '99999' },
          })
        )
      })
      it('getSpecimenVersion for non existing speciment result in 404', () => {
        return expectError404(
          makeTestCall({
            operationId: 'getSpecimenVersion',
            pathParams: { id: '99999', versionId: secondFetchedId },
          })
        )
      })
      it('getSpecimenVersion for existing speciment but non existing version result in 404', () => {
        return expectError404(
          makeTestCall({
            operationId: 'getSpecimenVersion',
            pathParams: { id: existingId, versionId: '99999' },
          })
        )
      })
    })
  })
})
