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
        id: '1',
        typeName: 'sex',
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
            id: '1',
            typeName: 'sex',
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
  input: { individualGroup, physicalUnits },
  mutations,
}

export default scenario
