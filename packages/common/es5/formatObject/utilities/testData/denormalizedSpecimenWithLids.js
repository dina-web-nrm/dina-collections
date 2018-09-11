'use strict';

module.exports = {
  id: '1234',
  type: 'specimen',
  individual: {
    lid: '15413ab7-4c2f-4072-b2ae-3192f2887808',
    determinations: [{
      lid: 'f2d775a3-ae22-4715-a83e-f2bd736ec2c4',
      determinationVerbatim: 'determinationVerbatim',
      determinedByAgent: { textI: 'determinedByAgentText' },
      remarks: 'remarks',
      taxon: {
        id: '2367',
        type: 'taxon'
      }
    }],
    recordHistoryEvents: [{
      agent: { normalizedAgent: { id: '1' } },
      date: {
        dateText: '2018'
      },
      lid: 'ee5f3ad9-2aeb-4d11-a479-3b09cc9a6145'
    }],
    taxonInformation: {
      lid: 'f01e22cd-8ef8-4b91-825b-9b30feeeea32'
    },
    featureObservations: [{
      lid: '21a79d27-3848-4f13-8179-6011a2e98298',
      featureObservationAgent: 'featureObservationAgent',
      featureObservationText: '21',
      featureType: {
        id: '1',
        type: 'featureType'
      },
      methodText: 'methodText'
    }],
    collectionItems: [{
      lid: '69d0e98a-b038-4f4d-9770-cb8c8aaa68a5',
      alternateIdentifiersText: 'alternateIdentifiersText',
      physicalObject: {
        id: '2234',
        type: 'physicalObject'
      },
      physicalObjectText: 'physicalObjectText'
    }],
    identifiers: [{
      lid: '9c9b1543-5b24-44ac-8032-cea5d430bcb7',
      identifierType: 'catalogNumber',
      namespace: '',
      value: '123456',
      publishRecord: true,
      remarks: ''
    }],
    collectingInformation: [{
      lid: 'e7253de8-6262-4fd6-8192-40dec5970f41',
      collectedByAgent: { textI: 'collectorsText' },
      event: {
        lid: 'ff09480e-cf01-4806-9142-5776b58c5eb5',
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