/* eslint-disable */
const collectionMammals = {
  resources: {
    123: {
      distinguishedUnits: {
        aDistinguishedUnit: {
          alternateIdentifiersText: 'alternateIdentifiersText',
          physicalUnit: {
            id: '1',
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
          },
        ],
        individualCircumstances: [
          {
            uuid: 'anIndividualCircumstance',
          },
        ],
      },
    },
  },
}

const curatedLocalities = {
  1: {
    id: '1',
    description: 'description',
    name: 'Africa',
    type: 'continent',
  },
  2: {
    id: '2',
    description: 'description',
    name: 'Algeria',
    type: 'country',
  },
  3: {
    id: '3',
    description: 'description',
    name: 'Balearic Islands',
    type: 'province',
  },
  4: {
    id: '4',
    description: 'description',
    name: 'GaspÃ© Peninsula',
    type: 'district',
  },
  5: {
    id: '5',
    description: 'description',
    name: 'Skansen',
    type: 'locality',
  },
}

const featureObservationTypes = {
  3: {
    id: '3',
    typeName: 'age',
  },
}

const identifiers = {
  1: {
    id: '1',
    identifierType: 'catalogNumber',
    nameSpace: '',
    value: '123456',
  },
}

const physicalUnits = {
  1: {
    id: '1',
    normalStorageLocationText: 'normalStorageLocationText',
    storedUnderTaxonName: 'Sorex minutus',
  },
}

const taxons = {
  1: {
    id: '1',
    rank: 'rank',
    scientificName: 'Sorex minutus',
    validName: true,
  },
}
