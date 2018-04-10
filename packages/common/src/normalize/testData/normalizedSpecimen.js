/* eslint-disable sort-keys */
module.exports = {
  id: '1234',
  type: 'specimen',
  determinations: [
    {
      determinationVerbatim: 'determinationVerbatim',
      determinedByAgentText: 'determinedByAgentText',
      isCurrentDetermination: true,
      remarks: 'remarks',
      taxon: {
        id: '2367',
        type: 'taxon',
      },
      lid: 'f2d775a3-ae22-4715-a83e-f2bd736ec2c4',
    },
  ],

  taxonInformation: [
    {
      determinations: ['f2d775a3-ae22-4715-a83e-f2bd736ec2c4'],
      lid: 'f01e22cd-8ef8-4b91-825b-9b30feeeea32',
    },
  ],
  events: [
    {
      endDate: 'endDate',
      expeditionText: 'expeditionText',
      localityInformation: {
        coordinatesVerbatim: 'coordinatesVerbatim',
        curatedLocalities: [
          {
            id: '1',
            type: 'curatedLocality',
          },
          {
            id: '2',
            type: 'curatedLocality',
          },
          {
            id: '3',
            type: 'curatedLocality',
          },
          {
            id: '4',
            type: 'curatedLocality',
          },
          {
            id: '5',
            type: 'curatedLocality',
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
      lid: 'ff09480e-cf01-4806-9142-5776b58c5eb5',
    },
  ],
  individualCircumstances: [
    {
      collectorsText: 'collectorsText',
      event: 'ff09480e-cf01-4806-9142-5776b58c5eb5',
      lid: 'e7253de8-6262-4fd6-8192-40dec5970f41',
    },
  ],
  featureObservations: [
    {
      featureObservationAgent: 'featureObservationAgent',
      featureObservationText: '21',
      featureType: {
        id: '1',
        type: 'featureType',
      },
      methodText: 'methodText',
      lid: '21a79d27-3848-4f13-8179-6011a2e98298',
    },
  ],
  identifiers: [
    {
      identifier: {
        identifierType: 'catalogNumber',
        nameSpace: '',
        value: '123456',
      },
      publishRecord: true,
      remarks: '',
      lid: '9c9b1543-5b24-44ac-8032-cea5d430bcb7',
    },
  ],
  collectionItems: [
    {
      alternateIdentifiersText: 'alternateIdentifiersText',
      physicalUnit: {
        id: '2234',
        type: 'physicalUnit',
      },
      physicalUnitText: 'physicalUnitText',
      lid: '69d0e98a-b038-4f4d-9770-cb8c8aaa68a5',
    },
  ],
  individual: {
    taxonInformation: 'f01e22cd-8ef8-4b91-825b-9b30feeeea32',
    featureObservations: ['21a79d27-3848-4f13-8179-6011a2e98298'],
    collectionItems: ['69d0e98a-b038-4f4d-9770-cb8c8aaa68a5'],
    identifiers: ['9c9b1543-5b24-44ac-8032-cea5d430bcb7'],
    individualCircumstances: ['e7253de8-6262-4fd6-8192-40dec5970f41'],
    lid: '15413ab7-4c2f-4072-b2ae-3192f2887808',
  },
}
