const individual = {
  collectionItems: [
    {
      physicalObject: {
        id: '1',
        type: 'physicalObject',
      },
    },
  ],
  determinations: [
    {
      taxon: {
        id: '1078',
        type: 'taxon',
      },
    },
  ],
  featureObservations: [
    {
      featureObservationText: 'female',
      featureType: {
        id: '22',
        type: 'featureType',
      },
    },
  ],
  identifiers: [
    {
      identifierType: 'catalogNumber',
      value: '444444',
    },
  ],
  taxonInformation: {},
}
const featureTypes = {
  1: {
    id: '1',
    type: 'featureType',
  },
  22: {
    id: '22',
    type: 'featureType',
  },
}
const physicalObjects = {
  1: {
    id: '1',
    type: 'physicalObject',
  },
}
const taxa = {
  1078: {
    id: '1078',
    type: 'taxon',
  },
}
const mutations = [
  {
    name: 'determinations.0.determinedByAgentText',
    value: 'John, Doe',
  },
]
const expectedOutput = {
  causeOfDeathTypes: [],
  establishmentMeansTypes: [],
  featureTypes: [
    {
      id: '22',
      type: 'featureType',
    },
  ],
  physicalObjects: [
    {
      id: '1',
      type: 'physicalObject',
    },
  ],
  places: [],
  preparationTypes: [],
  specimen: {
    individual: {
      collectingInformation: [],
      collectionItems: [
        {
          physicalObject: {
            id: '1',
            type: 'physicalObject',
          },
        },
      ],
      deathInformation: [],
      determinations: [
        {
          determinedByAgentText: 'John, Doe',
          taxon: {
            id: '1078',
            type: 'taxon',
          },
        },
      ],
      featureObservations: [
        {
          featureObservationText: 'female',
          featureType: {
            id: '22',
            type: 'featureType',
          },
        },
      ],
      identifiers: [
        {
          identifierType: 'catalogNumber',
          value: '444444',
        },
      ],
      recordHistoryEvents: [],
      taxonInformation: {},
    },
  },
  storageLocations: [],
  taxa: [
    {
      id: '1078',
      type: 'taxon',
    },
  ],
}

const scenario = {
  description: 'Update existing record by adding determinedByAgentText',
  expectedOutput,
  input: {
    featureTypes,
    physicalObjects,
    specimen: { attributes: { individual } },
    taxa,
  },
  mutations,
}

export default scenario
