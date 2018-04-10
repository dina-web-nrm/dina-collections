const individual = {
  collectionItems: [
    {
      physicalUnit: {
        id: '1',
        type: 'physicalUnit',
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
      identifier: {
        identifierType: 'catalogNumber',
        value: '444444',
      },
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
const physicalUnits = {
  1: {
    id: '1',
    type: 'physicalUnit',
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
  curatedLocalities: [],

  featureTypes: [
    {
      id: '22',
      type: 'featureType',
    },
  ],
  physicalUnits: [
    {
      id: '1',
      type: 'physicalUnit',
    },
  ],
  preparationTypes: [],
  specimen: {
    individual: {
      collectionItems: [
        {
          physicalUnit: {
            id: '1',
            storageLocation: undefined,
            type: 'physicalUnit',
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
          identifier: {
            identifierType: 'catalogNumber',
            value: '444444',
          },
        },
      ],
      individualCircumstances: [],
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
    physicalUnits,
    specimen: { individual },
    taxa,
  },
  mutations,
}

export default scenario
