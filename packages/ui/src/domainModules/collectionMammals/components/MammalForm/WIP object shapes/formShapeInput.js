/* eslint-disable */
const editMammalPristineFormState = {
  localResources: {
    distinguishedUnits: {
      aDistinguishedUnit: {
        alternateIdentifiersText: 'alternateIdentifiersText',
        physicalUnit: {
          id: '1',
          normalStorageLocationText: 'normalStorageLocationText',
          storedUnderTaxonName: 'Sorex minutus',
        },
        physicalUnitText: 'physicalUnitText',
        uuid: 'aDistinguishedUnit',
      },
    },
    events: {
      anEvent: {
        endDate: 'endDate',
        expeditionText: 'expeditionText',
        localityInformation: {
          coordinatesVerbatim: 'coordinatesVerbatim',
          curatedLocalities: [
            { id: '1' },
            { id: '2' },
            { id: '3' },
            { id: '4' },
            { id: '5' },
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
          isCurrentDetermination: true,
          remarks: 'remarks',
          taxon: {
            id: '1',
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
}

const editMammalDirtyFormState = {
  localResources: {
    distinguishedUnits: {
      aDistinguishedUnit: {
        alternateIdentifiersText: 'alternateIdentifiersText',
        physicalUnit: {
          normalStorageLocationText: 'normalStorageLocationText',
          storedUnderTaxonName: 'Sorex minutus',
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
}
