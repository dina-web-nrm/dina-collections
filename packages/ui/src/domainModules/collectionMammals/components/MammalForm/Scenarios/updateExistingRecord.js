const individual = {
  collectionItems: [
    {
      physicalObject: {
        id: '1',
        type: 'physicalObject',
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
  taxonInformation: {
    determinations: [
      {
        taxon: {
          id: '1078',
          type: 'taxon',
        },
      },
    ],
  },
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
    name: 'taxonInformation.determinations.0.determinedByAgentText',
    value: 'John, Doe',
  },
]
const expectedOutput = {
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
            storageLocation: undefined,
            type: 'physicalObject',
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
      readOnly: undefined,
      taxonInformation: {
        determinations: [
          {
            determinedByAgentText: 'John, Doe',
            taxon: {
              id: '1078',
              type: 'taxon',
            },
          },
        ],
      },
    },
    readOnly: undefined,
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
    specimen: { individual },
    taxa,
  },
  mutations,
}

export default scenario
