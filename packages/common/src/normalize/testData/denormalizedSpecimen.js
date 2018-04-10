/* eslint-disable sort-keys */
module.exports = {
  id: '1234',
  type: 'specimen',
  individual: {
    taxonInformation: {
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
        },
      ],
    },
    featureObservations: [
      {
        featureObservationAgent: 'featureObservationAgent',
        featureObservationText: '21',
        featureType: {
          id: '1',
          type: 'featureType',
        },
        methodText: 'methodText',
      },
    ],
    distinguishedUnits: [
      {
        alternateIdentifiersText: 'alternateIdentifiersText',
        physicalUnit: {
          id: '2234',
          type: 'physicalUnit',
        },
        physicalUnitText: 'physicalUnitText',
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
      },
    ],
    individualCircumstances: [
      {
        collectorsText: 'collectorsText',
        event: {
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
        },
      },
    ],
  },
}
