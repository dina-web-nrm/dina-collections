'use strict';

module.exports = {
  id: '1234',
  individual: {
    determinations: [{
      determinationVerbatim: 'determinationVerbatim',
      determinedByAgent: { textI: 'determinedByAgentText' },
      remarks: 'remarks',
      taxon: {
        id: '2367',
        type: 'taxon'
      }
    }],
    recordHistoryEvents: [{
      agent: { normalized: { id: '1' } },
      date: {
        dateText: '2018'
      }
    }],
    taxonInformation: {},
    featureObservations: [{
      featureObservationAgentText: 'featureObservationAgentText',
      featureObservationText: '21',
      featureType: {
        id: '1',
        type: 'featureType'
      },
      methodText: 'methodText'
    }],
    collectionItems: [{
      alternateIdentifiersText: 'alternateIdentifiersText',
      physicalObject: {
        id: '2234',
        lid: '24bf4bb4-f865-4182-a010-34aa898d845d',
        type: 'physicalObject'
      },
      physicalObjectText: 'physicalObjectText'
    }],
    identifiers: [{
      identifierType: { id: 1 },
      namespace: '',
      value: '123456',
      publishRecord: true,
      remarks: ''
    }],
    collectingInformation: [{
      collectedByAgent: { textI: 'collectorsText' },
      event: {
        endDate: 'endDate',
        expeditionText: 'expeditionText',
        locationInformation: {
          coordinatesVerbatim: 'coordinatesVerbatim',
          places: [{
            id: '1',
            type: 'place'
          }, {
            id: '2',
            type: 'place'
          }, {
            id: '3',
            type: 'place'
          }, {
            id: '4',
            type: 'place'
          }, {
            id: '5',
            type: 'place'
          }],
          georeferenceSourcesText: 'georeferenceSourcesText',
          localityVerbatim: 'localityVerbatim',
          position: {
            geodeticDatum: 'geodeticDatum text',
            latitude: 'latitude-string',
            longitude: 'longitude-string',
            uncertaintyInMeters: 10
          },
          remarks: 'remarks',
          verticalPosition: {
            maximumDepthInMeters: 100,
            maximumElevationInMeters: 100,
            minimumDepthInMeters: 20,
            minimumElevationInMeters: 20
          }
        }
      }
    }]
  }
};