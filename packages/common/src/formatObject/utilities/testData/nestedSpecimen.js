/* eslint-disable sort-keys */
module.exports = {
  id: '1234',
  individual: {
    determinations: [
      {
        determinationVerbatim: 'determinationVerbatim',
        determinedByAgent: { textI: 'determinedByAgentText' },
        remarks: 'remarks',
        taxonNameI: 'Sorex minutus',
      },
    ],
    recordHistoryEvents: [
      {
        agent: { normalized: { id: '1' } },
        date: {
          dateText: '2018',
        },
      },
    ],
    taxonInformation: {
      curatorialTaxon: {
        id: '500',
      },
    },
    featureObservations: [
      {
        featureObservationAgentText: 'featureObservationAgentText',
        featureObservationText: '21',
        featureType: {
          id: '1',
        },
        methodText: 'methodText',
      },
    ],
    collectionItems: [
      {
        alternateIdentifiersText: 'alternateIdentifiersText',
        physicalObject: {
          id: '2234',
        },
        physicalObjectText: 'physicalObjectText',
      },
    ],
    identifiers: [
      {
        identifierType: { id: '1' },
        namespace: '',
        value: '123456',
        publishRecord: true,
        remarks: '',
      },
    ],
    collectingInformation: [
      {
        collectedByAgent: { textI: 'collectorsText' },
        event: {
          endDate: 'endDate',
          expeditionText: 'expeditionText',
          locationInformation: {
            coordinatesVerbatim: 'coordinatesVerbatim',
            places: [
              {
                id: '1',
              },
              {
                id: '2',
              },
              {
                id: '3',
              },
              {
                id: '4',
              },
              {
                id: '5',
              },
            ],
            georeferenceSourcesText: 'georeferenceSourcesText',
            localityVerbatim: 'localityVerbatim',
            position: {
              geodeticDatum: 'geodeticDatum text',
              latitude: 'latitude-string',
              longitude: 'longitude-string',
              uncertaintyInMeters: 10,
            },
            remarks: 'remarks',
            verticalPosition: {
              maximumDepthInMeters: 100,
              maximumElevationInMeters: 100,
              minimumDepthInMeters: 20,
              minimumElevationInMeters: 20,
            },
          },
        },
      },
    ],
  },
  resourceActivities: [],
}
