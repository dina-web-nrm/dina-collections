/* eslint-disable */
const createPhysicalUnitRequest = {
  attributes: {
    normalStorageLocationText: 'normalStorageLocationText',
    storedUnderTaxonName: 'Sorex minutus',
  },
  type: 'physicalUnit',
}

const createPhysicalUnitResponse = {
  attributes: {
    normalStorageLocationText: 'normalStorageLocationText',
    storedUnderTaxonName: 'Sorex minutus',
  },
  id: '2',
  type: 'physicalUnit',
}

const updateSpecimen = {
  id: '123',
  type: 'specimen',
  relationships: {
    physicalUnits: [{ id: '2', type: 'physicalUnit' }],
    taxons: [{ id: '1', type: 'taxon' }, { id: '2', type: 'taxon' }],
  },
  attributes: {
    localResources: {
      distinguishedUnits: {
        aDistinguishedUnit: {
          alternateIdentifiersText: 'alternateIdentifiersText',
          physicalUnit: {
            id: '2',
          },
          physicalUnitText: 'physicalUnitText',
          uuid: 'aDistinguishedUnit',
        },
      },
      events: {
        anEvent: {
          endDate: 'endDate',
          expeditionText: 'new expedition text',
          localityInformation: {
            coordinatesVerbatim: 'coordinatesVerbatim',
            curatedLocalities: [
              { id: '1' },
              { id: '2' },
              { id: '3' },
              { id: '4' },
              { id: '6' },
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
          startDate: 'startDate',
          uuid: 'anEvent',
        },
      },
      individualCircumstances: {
        anIndividualCircumstance: {
          collectorsText: 'collectorsText',
          event: { uuid: 'anEvent' },
          uuid: 'anIndividualCircumstance',
        },
      },
    },
    individualGroup: {
      taxonInformation: {
        determinations: [
          {
            date: 'date',
            determinationVerbatim: 'determinationVerbatim',
            determinedByAgentText: 'determinedByAgentText',
            isCurrentDetermination: false,
            remarks: 'remarks',
            taxon: {
              id: '1',
            },
          },
          {
            date: 'date',
            determinationVerbatim: 'determinationVerbatim',
            determinedByAgentText: 'determinedByAgentText',
            isCurrentDetermination: true,
            remarks: 'remarks',
            taxon: {
              id: '2',
            },
          },
        ],
      },
      featureObservations: [
        {
          date: 'date',
          featureObservationAgent: 'featureObservationAgent',
          featureObservationText: '21',
          featureObservationType: {
            id: '3',
          },
          methodText: 'methodText',
        },
        {
          date: 'date',
          featureObservationAgent: 'featureObservationAgent',
          featureObservationText: 'featureObservationText',
          featureObservationType: {
            id: '4',
          },
          methodText: 'methodText',
        },
      ],
      distinguishedUnits: [
        {
          uuid: 'aDistinguishedUnit',
        },
      ],
      identifiers: [
        {
          id: '1',
          identifierType: 'catalogNumber',
          nameSpace: '',
          value: '123456',
        },
      ],
      individualCircumstances: [
        {
          uuid: 'anIndividualCircumstance',
        },
      ],
    },
  },
}
