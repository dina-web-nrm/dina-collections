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
        taxonNameStandardized: 'Chironectes minimus',
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
    storedUnderTaxonName: 'Chironectes minimus',
    type: 'physicalUnit',
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
  featureObservationTypes: [
    {
      id: '22',
      type: 'featureObservationType',
    },
  ],
  physicalUnits: [
    {
      id: '1',
      storedUnderTaxonName: 'Chironectes minimus',
      type: 'physicalUnit',
    },
  ],
  specimen: {
    individualGroup: {
      distinguishedUnits: [
        {
          physicalUnit: {
            id: '1',
            storedUnderTaxonName: 'Chironectes minimus',
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
      taxonInformation: {
        determinations: [
          {
            determinedByAgentText: 'John, Doe',
            taxonNameStandardized: 'Chironectes minimus',
          },
        ],
      },
    },
  },
}

const scenario = {
  description: 'Update existing record by adding determinedByAgentText',
  expectedOutput,
  input: { featureObservationTypes, individualGroup, physicalUnits },
  mutations,
}

export default scenario
