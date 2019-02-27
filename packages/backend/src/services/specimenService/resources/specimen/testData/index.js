exports.UNEXPECTED_SUCCESS = 'Call successful but should have failed'

const testData = {}

testData.initialRelationships = {
  causeOfDeathTypes: { data: [] },
  establishmentMeansTypes: { data: [] },
  featureTypes: { data: [] },
  identifierTypes: { data: [] },
  normalizedAgents: { data: [] },
  physicalObjects: { data: [] },
  places: { data: [] },
  preparationTypes: { data: [] },
  resourceActivities: { data: [] },
  taxonNames: { data: [] },
  typeSpecimenType: { data: null },
}

testData.simpleDataNoRelations = {
  data: {
    attributes: {
      individual: {
        collectionItems: [],
        featureObservations: [],
        identifiers: [
          {
            identifierType: { id: '1', type: 'identifierType' },
            lid: '4444-33333',
            namespace: '',
            remarks: '',
            value: '123457',
          },
        ],
      },
    },
    type: 'specimen',
  },
}

testData.simpleDataPhysicalObjectRelations = {
  data: {
    attributes: {
      individual: {
        collectionItems: [],
        featureObservations: [],
        identifiers: [
          {
            identifierType: { id: '1', type: 'identifierType' },
            lid: '4444-33333',
            namespace: '',
            remarks: '',
            value: '123458',
          },
        ],
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
      individual: {
        collectionItems: [],
        featureObservations: [],
        identifiers: [
          {
            identifierType: { id: '1', type: 'identifierType' },
            lid: '4444-33333',
            namespace: '',
            remarks: '',
            value: '123458',
          },
        ],
      },
    },
    relationships: {
      featureTypes: {
        data: [
          {
            id: '1',
            type: 'featureType',
          },
        ],
      },
      normalizedAgents: {
        data: [],
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
  },
}

testData.simpleDataInvalidRelationsFormat = {
  data: {
    attributes: {
      individual: {
        collectionItems: [],
        featureObservations: [],
        identifiers: [
          {
            identifierType: { id: '1', type: 'identifierType' },
            lid: '4444-33333',
            namespace: '',
            remarks: '',
            value: '123458',
          },
        ],
      },
    },
    relationships: {
      physicalObjects: {
        id: '2234',
        type: 'physicalObject',
      },
    },
  },
}

testData.simpleDataInvalidRelations = {
  data: {
    attributes: {
      individual: {
        collectionItems: [],
        featureObservations: [],
        identifiers: [
          {
            identifierType: { id: '1', type: 'identifierType' },
            lid: '4444-33333',
            namespace: '',
            remarks: '',
            value: '123458',
          },
        ],
      },
    },
    relationships: {
      physicalObjects: {
        id: '2234',
        type: 'storageLocation',
      },
    },
  },
}

module.exports = {
  ...testData,
  getTestData: key => {
    return JSON.parse(JSON.stringify(testData[key]))
  },
}
