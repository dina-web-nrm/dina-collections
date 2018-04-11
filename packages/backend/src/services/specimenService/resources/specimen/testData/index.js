exports.UNEXPECTED_SUCCESS = 'Call successful but should have failed'

const testData = {}

testData.badRequestMissingCatalogNumber = {
  data: {
    attributes: {
      individual: {
        collectionItems: [],
        featureObservations: [],
        identifiers: [],
      },
    },
    type: 'specimen',
  },
}

testData.simpleDataNoRelations = {
  data: {
    attributes: {
      identifiers: [
        {
          identifierType: 'catalogNumber',
          lid: '4444-33333',
          nameSpace: '',
          publishRecord: true,
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
    type: 'specimen',
  },
}

testData.simpleDataPhysicalObjectRelations = {
  data: {
    attributes: {
      identifiers: [
        {
          identifierType: 'catalogNumber',
          lid: '4444-33333',
          nameSpace: '',
          publishRecord: true,
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
      identifiers: [
        {
          identifierType: 'catalogNumber',
          lid: '4444-33333',
          nameSpace: '',
          publishRecord: true,
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
    relationships: {
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
      taxa: {
        data: [],
      },
    },
    type: 'specimen',
  },
}

testData.simpleDataInvalidRelationsFormat = {
  data: {
    attributes: {
      identifiers: [
        {
          identifierType: 'catalogNumber',
          lid: '4444-33333',
          nameSpace: '',
          publishRecord: true,
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
      identifiers: [
        {
          identifierType: 'catalogNumber',
          lid: '4444-33333',
          nameSpace: '',
          publishRecord: true,
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
