const apiDescribe = require('../../../../utilities/test/apiDescribe')
const { makeTestCall } = require('../../../../utilities/test/testApiClient')
const waitForApiRestart = require('../../../../utilities/test/waitForApiRestart')

const validTaxonName = 'Chironectes minimus'

const badRequestMissingCatalogNumber = {
  data: {
    attributes: {
      featureObservations: [],
      identifications: [],
      occurrences: [],
      physicalUnits: [],
    },
    type: 'individualGroup',
  },
}

const fullFormExample = {
  data: {
    attributes: {
      causeOfDeathStandardized: 'Standardized death cause',
      causeOfDeathText: 'Cause of death ',
      featureObservations: [
        {
          featureObservationText: 'A condition at collecting',
          featureObservationType: {
            featureObservationTypeName: 'conditionAtCollecting',
            id: '2',
          },
        },
        {
          featureObservationAgent: 'JD',
          featureObservationDate: 'A date',
          featureObservationText: 'male',
          featureObservationType: {
            featureObservationTypeName: 'sex',
            id: '1',
          },
          methodText: 'method text',
        },
      ],
      identifications: [
        {
          identificationRemarks: 'some remarks',
          identifiedAsVerbatim: 'Sorex minutus',
          identifiedByAgentText: 'Doe, J.',
          identifiedDateText: 'Date text',
          identifiedTaxonNameStandardized: validTaxonName,
          isCurrentIdentification: true,
        },
      ],
      occurrences: [
        {
          collectorsText: 'Bergström, U',
          dayEnd: 15,
          dayStart: 15,
          establishmentMeansStandardized: 'establishmentMeansStandardized',
          expeditionText: 'Vega Expedition',
          isDeathEvent: true,
          localityInformation: {
            coordinatesVerbatim: 'coord-string',
            curatedLocalities: [
              {
                id: '123',
              },
              {
                id: '125',
              },
            ],
            georeferenceSourcesText: 'georeferenceSourcesText text',
            localityRemarks: 'localityRemarks text',
            localityVerbatim: 'Some localityVerbatim text',
            position: {
              latitude: 'latitude-string',
              longitude: 'longitude-string',
              uncertaintyInMeters: 10,
            },
            verticalPosition: {
              maximumDepthInMeters: 100,
              maximumElevationInMeters: 100,
              minimumDepthInMeters: 20,
              minimumElevationInMeters: 20,
            },
          },
          monthEnd: 1,
          monthStart: 1,
          occurrenceDateText: '15 jan 1986',
          yearEnd: 1986,
          yearStart: 1986,
        },
      ],
      originStandardized: 'Standardized origin',
      physicalUnits: [
        {
          alternateIdentifiersText: 'alternateIdentifiersText',
          catalogedUnit: {
            catalogNumber: '584028',
            publishRecord: true,
            storedUnderTaxonName: 'Sorex minutus',
          },
          normalStorageLocationText: 'normalStorageLocationText',
          physicalUnitText: 'physicalUnitText',
        },
      ],
    },
  },
}

const UNEXPECTED_SUCCESS = 'Call successfull but should have failed'

apiDescribe('individualGroup', () => {
  let authToken
  beforeAll(() => {
    return waitForApiRestart().then(() => {
      authToken = 1234
    })
  })

  it('Runs individualGroup tests', () => {
    expect(!!authToken).toBeTruthy()
    expect(1).toBe(1)
  })

  describe('createIndividualGroup', () => {
    it('Succeed with full form example', () => {
      return makeTestCall({
        authToken,
        body: fullFormExample,
        operationId: 'createIndividualGroup',
      }).then(res => {
        expect(res).toBeTruthy()
        expect(res.data).toBeTruthy()
        expect(res.data.type).toBe('individualGroup')
        expect(res.data.attributes).toBeTruthy()
        expect(res.data.attributes.physicalUnits).toBeTruthy()
        expect(res.data.attributes.featureObservations).toBeTruthy()
        expect(res.data.attributes.identifications).toBeTruthy()
        expect(res.data.attributes.occurrences).toBeTruthy()
      })
    })
    it('Fails create with missing catalog number', () => {
      return makeTestCall({
        authToken,
        body: badRequestMissingCatalogNumber,
        operationId: 'createIndividualGroup',
      })
        .then(() => {
          throw new Error(UNEXPECTED_SUCCESS)
        })
        .catch(err => {
          expect(err.message).not.toBe(UNEXPECTED_SUCCESS)
        })
    })
  })
})
