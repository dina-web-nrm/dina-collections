const individualGroup = {
  distinguishedUnits: [
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
      featureObservationType: {
        id: '22',
        type: 'featureObservationType',
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
const featureObservationTypes = {
  1: {
    id: '1',
    type: 'featureObservationType',
  },
  22: {
    id: '22',
    type: 'featureObservationType',
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
  distinguishedUnitTypes: [],
  featureObservationTypes: [
    {
      id: '22',
      type: 'featureObservationType',
    },
  ],
  physicalUnits: [
    {
      id: '1',
      type: 'physicalUnit',
    },
  ],
  specimen: {
    individualGroup: {
      distinguishedUnits: [
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
          featureObservationType: {
            id: '22',
            type: 'featureObservationType',
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
    featureObservationTypes,
    physicalUnits,
    specimen: { individualGroup },
    taxa,
  },
  mutations,
}

export default scenario
