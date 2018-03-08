/* eslint-disable */
const specimenById = {
  id: '123',
  type: 'specimen',
  relationships: {
    curatedLocalities: [
      { id: '1', type: 'curatedLocality' },
      { id: '2', type: 'curatedLocality' },
      { id: '3', type: 'curatedLocality' },
      { id: '4', type: 'curatedLocality' },
      { id: '5', type: 'curatedLocality' },
    ],
    featureObservationTypes: [
      {
        id: '3',
        type: 'featureObservationType',
      },
    ],
    identifiers: [
      {
        id: '1',
        type: 'identifier',
      },
    ],
    physicalUnits: [{ id: '1', type: 'physicalUnit' }],
    taxons: [{ id: '1', type: 'taxon' }],
  },
  attributes: {
    localResources: {
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
}

const curatedLocalityById1 = {
  id: '1',
  type: 'curatedLocality',
  attributes: {
    name: 'Africa',
    description: 'description',
    type: 'continent',
  },
}
const curatedLocalityById2 = {
  id: '2',
  type: 'curatedLocality',
  attributes: {
    name: 'Algeria',
    description: 'description',
    type: 'country',
  },
}
const curatedLocalityById3 = {
  id: '3',
  type: 'curatedLocality',
  attributes: {
    name: 'Balearic Islands',
    description: 'description',
    type: 'province',
  },
}
const curatedLocalityById4 = {
  id: '4',
  type: 'curatedLocality',
  attributes: {
    name: 'GaspÃ© Peninsula',
    description: 'description',
    type: 'district',
  },
}
const curatedLocalityById5 = {
  id: '5',
  type: 'curatedLocality',
  attributes: {
    name: 'Skansen',
    description: 'description',
    type: 'locality',
  },
}

const featureObservationTypeById = {
  id: '3',
  type: 'featureObservationType',
  attributes: {
    typeName: 'age',
  },
}

const identifierById = {
  id: '1',
  type: 'identifier',
  attributes: {
    identifierType: 'catalogNumber',
    nameSpace: '',
    value: '123456',
  },
}

const physicalUnitById = {
  id: '1',
  type: 'physicalUnit',
  attributes: {
    normalStorageLocationText: 'normalStorageLocationText',
    storedUnderTaxonName: 'Sorex minutus',
  },
}

const taxonById = {
  id: '1',
  type: 'taxon',
  attributes: {
    rank: 'rank',
    scientificName: 'Sorex minutus',
    validName: true,
  },
}
