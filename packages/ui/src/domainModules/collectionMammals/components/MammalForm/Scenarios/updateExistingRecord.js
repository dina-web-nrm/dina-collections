const individualGroup = {
  distinguishedUnits: [
    {
      physicalUnit: {
        storedUnderTaxonName: 'Chironectes minimus',
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
const mutations = [
  {
    name: 'taxonInformation.determinations.0.determinedByAgentText',
    value: 'John, Doe',
  },
]
const expectedOutput = {
  individualGroup: {
    distinguishedUnits: [
      {
        physicalUnit: {
          storedUnderTaxonName: 'Chironectes minimus',
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
}

const scenario = {
  description: 'Update existing record by adding determinedByAgentText',
  expectedOutput,
  input: individualGroup,
  mutations,
}

export default scenario
