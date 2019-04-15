import initialState from './initialState'

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
      taxonName: {
        id: '1078',
        type: 'taxonName',
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
    name: 'individual.determinations.0.determinedByAgent',
    value: { textI: 'John, Doe' },
  },
]
const expectedOutput = {
  individual: {
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
        determinedByAgent: { textI: 'John, Doe' },
        taxonName: {
          id: '1078',
          type: 'taxonName',
        },
      },
    ],
    featureObservations: [
      {
        featureObservationText: 'female',
        featureType: {
          id: '22',
        },
      },
    ],
    identifiers: [
      {
        identifierType: 'catalogNumber',
        value: '444444',
      },
    ],
    recordHistoryEvents: [
      {
        description: 'Creation of catalog card',
        system: 'catalogCard',
      },
    ],
    taxonInformation: {},
  },
}

const scenario = {
  description: 'Update existing record by adding determinedByAgentText',
  expectedOutput,
  initialState,
  input: {
    featureTypes,
    physicalObjects,
    specimen: { individual },
    taxa,
  },
  mutations,
}

export default scenario
