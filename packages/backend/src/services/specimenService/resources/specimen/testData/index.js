exports.UNEXPECTED_SUCCESS = 'Call successful but should have failed'

const testData = {}

testData.badRequestMissingCatalogNumber = {
  data: {
    attributes: {
      individualGroup: {
        distinguishedUnits: [],
        featureObservations: [],
        identifiers: [],
        taxonInformation: {},
      },
    },
    type: 'specimen',
  },
}

testData.simpleDataNoRelations = {
  data: {
    attributes: {
      individualGroup: {
        distinguishedUnits: [],
        featureObservations: [],
        identifiers: [
          {
            identifier: {
              identifierType: 'catalogNumber',
              nameSpace: '',
              value: '123457',
            },
            publishRecord: true,
            remarks: '',
          },
        ],
        taxonInformation: {},
      },
    },
    type: 'specimen',
  },
}

testData.simpleDataPhysicalUnitRelations = {
  data: {
    attributes: {
      individualGroup: {
        distinguishedUnits: [],
        featureObservations: [],
        identifiers: [
          {
            identifier: {
              identifierType: 'catalogNumber',
              nameSpace: '',
              value: '123458',
            },
            publishRecord: true,
            remarks: '',
          },
        ],
        taxonInformation: {},
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
      individualGroup: {
        distinguishedUnits: [],
        featureObservations: [],
        identifiers: [
          {
            identifier: {
              identifierType: 'catalogNumber',
              nameSpace: '',
              value: '123458',
            },
            publishRecord: true,
            remarks: '',
          },
        ],
        taxonInformation: {},
      },
    },
    relationships: {
      featureObservationTypes: {
        data: [
          {
            id: '1',
            type: 'featureObservationType',
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
    },
    type: 'specimen',
  },
}

testData.simpleDataInvalidRelationsFormat = {
  data: {
    attributes: {
      individualGroup: {
        distinguishedUnits: [],
        featureObservations: [],
        identifiers: [
          {
            identifier: {
              identifierType: 'catalogNumber',
              nameSpace: '',
              value: '123458',
            },
            publishRecord: true,
            remarks: '',
          },
        ],
        taxonInformation: {},
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
      individualGroup: {
        distinguishedUnits: [],
        featureObservations: [],
        identifiers: [
          {
            identifier: {
              identifierType: 'catalogNumber',
              nameSpace: '',
              value: '123458',
            },
            publishRecord: true,
            remarks: '',
          },
        ],
        taxonInformation: {},
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
