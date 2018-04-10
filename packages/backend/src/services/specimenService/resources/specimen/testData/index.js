exports.UNEXPECTED_SUCCESS = 'Call successful but should have failed'

const testData = {}

testData.badRequestMissingCatalogNumber = {
  data: {
    attributes: {
      individual: {
        distinguishedUnits: [],
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
          identifier: {
            identifierType: 'catalogNumber',
            nameSpace: '',
            value: '123457',
          },
          lid: '4444-33333',
          publishRecord: true,
          remarks: '',
        },
      ],
      individual: {
        distinguishedUnits: [],
        featureObservations: [],
        identifiers: ['4444-33333'],
      },
    },
    type: 'specimen',
  },
}

testData.simpleDataPhysicalUnitRelations = {
  data: {
    attributes: {
      identifiers: [
        {
          identifier: {
            identifierType: 'catalogNumber',
            nameSpace: '',
            value: '123458',
          },
          lid: '4444-33333',
          publishRecord: true,
          remarks: '',
        },
      ],
      individual: {
        distinguishedUnits: [],
        featureObservations: [],
        identifiers: ['4444-33333'],
      },
    },
    relationships: {
      physicalUnits: {
        data: [
          {
            id: '2234',
            type: 'physicalUnit',
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
          identifier: {
            identifierType: 'catalogNumber',
            nameSpace: '',
            value: '123458',
          },
          lid: '4444-33333',
          publishRecord: true,
          remarks: '',
        },
      ],
      individual: {
        distinguishedUnits: [],
        featureObservations: [],
        identifiers: ['4444-33333'],
      },
    },
    relationships: {
      curatedLocalities: {
        data: [{ id: '1', type: 'curatedLocality' }],
      },
      featureTypes: {
        data: [
          {
            id: '1',
            type: 'featureType',
          },
        ],
      },
      physicalUnits: {
        data: [
          {
            id: '2234',
            type: 'physicalUnit',
          },
        ],
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
          identifier: {
            identifierType: 'catalogNumber',
            nameSpace: '',
            value: '123458',
          },
          lid: '4444-33333',
          publishRecord: true,
          remarks: '',
        },
      ],
      individual: {
        distinguishedUnits: [],
        featureObservations: [],
        identifiers: ['4444-33333'],
      },
    },
    relationships: {
      physicalUnits: {
        id: '2234',
        type: 'physicalUnit',
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
          identifier: {
            identifierType: 'catalogNumber',
            nameSpace: '',
            value: '123458',
          },
          lid: '4444-33333',
          publishRecord: true,
          remarks: '',
        },
      ],
      individual: {
        distinguishedUnits: [],
        featureObservations: [],
        identifiers: ['4444-33333'],
      },
    },
    relationships: {
      physicalUnits: {
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
