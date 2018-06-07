/* eslint-disable sort-keys */
module.exports = {
  type: 'specimen',
  id: '1234',
  relationships: {
    agents: {
      data: [
        {
          type: 'agent',
          id: '1',
        },
      ],
    },
    featureTypes: {
      data: [
        {
          type: 'featureType',
          id: '1',
          attributes: {
            type: 'featureType',
          },
        },
      ],
    },
    identifierTypes: {
      data: [
        {
          type: 'identifierType',
          id: 1,
        },
      ],
    },
    physicalObjects: {
      data: [
        {
          type: 'physicalObject',
          id: '2234',
          attributes: {
            type: 'physicalObject',
          },
        },
      ],
    },
    places: {
      data: [
        {
          type: 'place',
          id: '1',
          attributes: {
            type: 'place',
          },
        },
        {
          type: 'place',
          id: '2',
          attributes: {
            type: 'place',
          },
        },
        {
          type: 'place',
          id: '3',
          attributes: {
            type: 'place',
          },
        },
        {
          type: 'place',
          id: '4',
          attributes: {
            type: 'place',
          },
        },
        {
          type: 'place',
          id: '5',
          attributes: {
            type: 'place',
          },
        },
      ],
    },
  },
  attributes: {
    normalized: {
      determinations: [
        {
          determinationVerbatim: 'determinationVerbatim',
          determinedByAgentText: 'determinedByAgentText',
          remarks: 'remarks',
          taxon: {
            id: '2367',
            type: 'taxon',
          },
          lid: '3a823494-b06f-4202-80c3-a8bf58d2dd40',
        },
      ],
      taxonInformation: [
        {
          lid: '9b6bd5ea-5605-463a-9262-1e83fd618b14',
        },
      ],
      events: [
        {
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
          lid: 'd61ec620-e5df-4141-8691-a0fe42ec0c5b',
        },
      ],
      collectingInformation: [
        {
          collectorsText: 'collectorsText',
          event: 'd61ec620-e5df-4141-8691-a0fe42ec0c5b',
          lid: '06c5b25b-13dd-4c27-8bc2-18723fb1beb3',
        },
      ],
      featureObservations: [
        {
          featureObservationAgentText: 'featureObservationAgentText',
          featureObservationText: '21',
          featureType: {
            id: '1',
          },
          methodText: 'methodText',
          lid: 'b7973764-992a-4c42-816a-566e2c4ada7e',
        },
      ],
      identifiers: [
        {
          identifierType: {
            id: 1,
          },
          nameSpace: '',
          value: '123456',
          publishRecord: true,
          remarks: '',
          lid: '34674e21-924c-4c1a-8c91-c15758cce3af',
        },
      ],
      collectionItems: [
        {
          alternateIdentifiersText: 'alternateIdentifiersText',
          physicalObject: {
            id: '2234',
          },
          physicalObjectText: 'physicalObjectText',
          lid: 'f1479610-6618-49e7-b148-8fbaeaacbcdd',
        },
      ],
      recordHistoryEvents: [
        {
          agent: {
            id: '1',
          },
          date: {
            dateText: '2018',
          },
          lid: '35677dc2-73ed-4478-889c-d7fe5f7565c1',
        },
      ],
      individuals: [
        {
          determinations: ['3a823494-b06f-4202-80c3-a8bf58d2dd40'],
          recordHistoryEvents: ['35677dc2-73ed-4478-889c-d7fe5f7565c1'],
          taxonInformation: '9b6bd5ea-5605-463a-9262-1e83fd618b14',
          featureObservations: ['b7973764-992a-4c42-816a-566e2c4ada7e'],
          collectionItems: ['f1479610-6618-49e7-b148-8fbaeaacbcdd'],
          identifiers: ['34674e21-924c-4c1a-8c91-c15758cce3af'],
          collectingInformation: ['06c5b25b-13dd-4c27-8bc2-18723fb1beb3'],
          lid: '6958cbc2-4c47-4bb8-bb56-c60f7c37b79f',
        },
      ],
    },
    individual: '6958cbc2-4c47-4bb8-bb56-c60f7c37b79f',
  },
}
