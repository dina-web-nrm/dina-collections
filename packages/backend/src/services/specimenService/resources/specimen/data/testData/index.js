exports.UNEXPECTED_SUCCESS = 'Call successful but should have failed'

const testData = {}

testData.badRequestMissingCatalogNumber = {
  data: {
    attributes: {
      normalized: {
        individual: {
          collectionItems: [],
          featureObservations: [],
          identifiers: [],
        },
      },
    },
    type: 'specimen',
  },
}

testData.initialRelationships = {
  agents: { data: [] },
  causeOfDeathTypes: { data: [] },
  establishmentMeansTypes: { data: [] },
  featureTypes: { data: [] },
  identifierTypes: { data: [] },
  physicalObjects: { data: [] },
  places: { data: [] },
  preparationTypes: { data: [] },
  taxonNames: { data: [] },
  typeSpecimenType: { data: null },
}

testData.simpleDataNoRelations = {
  data: {
    attributes: {
      normalized: {
        identifiers: [
          {
            identifierType: { id: '1', type: 'identifierType' },
            lid: '4444-33333',
            namespace: '',
            remarks: '',
            value: '123457',
          },
        ],
        individual: {
          collectionItems: [],
          featureObservations: [],
          identifiers: ['4444-33333'],
        },
      },
    },
    type: 'specimen',
  },
}

testData.simpleDataPhysicalObjectRelations = {
  data: {
    attributes: {
      normalized: {
        identifiers: [
          {
            identifierType: { id: '1', type: 'identifierType' },
            lid: '4444-33333',
            namespace: '',
            remarks: '',
            value: '123458',
          },
        ],
        individual: {
          collectionItems: [],
          featureObservations: [],
          identifiers: ['4444-33333'],
        },
      },
    },
    relationships: {
      physicalObjects: {
        data: [
          {
            id: '2234',
            type: 'physicalObject',
          },
        ],
      },
    },
    type: 'specimen',
  },
}

testData.simpleDataMultipleRelations = {
  data: {
    attributes: {
      normalized: {
        identifiers: [
          {
            identifierType: { id: '1', type: 'identifierType' },
            lid: '4444-33333',
            namespace: '',
            remarks: '',
            value: '123458',
          },
        ],
        individual: {
          collectionItems: [],
          featureObservations: [],
          identifiers: ['4444-33333'],
        },
      },
    },
    relationships: {
      agents: {
        data: [],
      },
      featureTypes: {
        data: [
          {
            id: '1',
            type: 'featureType',
          },
        ],
      },
      physicalObjects: {
        data: [
          {
            id: '2234',
            type: 'physicalObject',
          },
        ],
      },
      places: {
        data: [{ id: '1', type: 'place' }],
      },
      taxonNames: {
        data: [],
      },
    },
    type: 'specimen',
  },
}

testData.simpleDataInvalidRelationsFormat = {
  data: {
    attributes: {
      normalized: {
        identifiers: [
          {
            identifierType: { id: '1', type: 'identifierType' },
            lid: '4444-33333',
            namespace: '',
            remarks: '',
            value: '123458',
          },
        ],
        individual: {
          collectionItems: [],
          featureObservations: [],
          identifiers: ['4444-33333'],
        },
      },
    },
    relationships: {
      physicalObjects: {
        id: '2234',
        type: 'physicalObject',
      },
    },
    type: 'specimen',
  },
}

testData.simpleDataInvalidRelations = {
  data: {
    attributes: {
      normalized: {
        identifiers: [
          {
            identifierType: { id: '1', type: 'identifierType' },
            lid: '4444-33333',
            namespace: '',
            remarks: '',
            value: '123458',
          },
        ],
        individual: {
          collectionItems: [],
          featureObservations: [],
          identifiers: ['4444-33333'],
        },
      },
    },
    relationships: {
      physicalObjects: {
        id: '2234',
        type: 'storageLocation',
      },
    },
    type: 'specimen',
  },
}

module.exports = {
  ...testData,
  getTestData: key => {
    return JSON.parse(JSON.stringify(testData[key]))
  },
}
