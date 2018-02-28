const validCatalogNumber = '123456'
const validTaxonName = 'Chironectes minimus'

const UNEXPECTED_SUCCESS = 'Call successful but should have failed'

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
            catalogNumber: validCatalogNumber,
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

const updateFullFormExample = {
  ...fullFormExample,
  data: {
    ...fullFormExample.data,
    attributes: {
      ...fullFormExample.data.attributes,
      causeOfDeathStandardized: 'something else',
    },
  },
}

module.exports = {
  fullFormExample,
  UNEXPECTED_SUCCESS,
  updateFullFormExample,
}
