/* eslint-disable sort-keys */
module.exports = {
  id: '1234',
  individual: {
    determinations: [
      {
        determinationVerbatim: 'determinationVerbatim',
        determinedByAgentText: 'determinedByAgentText',
        remarks: 'remarks',
        taxon: {
          id: '2367',
          type: 'taxon',
        },
      },
    ],
    recordHistoryEvents: [
      {
        agent: { id: '1' },
        date: {
          dateText: '2018',
        },
      },
    ],
    taxonInformation: {},
    featureObservations: [
      {
        featureObservationAgentText: 'featureObservationAgentText',
        featureObservationText: '21',
        featureType: {
          id: '1',
          type: 'featureType',
        },
        methodText: 'methodText',
      },
    ],
    collectionItems: [
      {
        alternateIdentifiersText: 'alternateIdentifiersText',
        physicalObject: {
          id: '2234',
          type: 'physicalObject',
        },
        physicalObjectText: 'physicalObjectText',
      },
    ],
    identifiers: [
      {
        identifierType: { id: 1 },
        nameSpace: '',
        value: '123456',
        publishRecord: true,
        remarks: '',
      },
    ],
    collectingInformation: [
      {
        collectorsText: 'collectorsText',
        event: {
          endDate: 'endDate',
          expeditionText: 'expeditionText',
          locationInformation: {
            coordinatesVerbatim: 'coordinatesVerbatim',
            places: [
              {
                id: '1',
                type: 'place',
              },
              {
                id: '2',
                type: 'place',
              },
              {
                id: '3',
                type: 'place',
              },
              {
                id: '4',
                type: 'place',
              },
              {
                id: '5',
                type: 'place',
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
}
