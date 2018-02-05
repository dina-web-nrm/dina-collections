const { login, makeTestCall } = require('../utilities')

const onlyCatalogedUnit = {
  data: {
    additionalData: [
      {
        attributes: {
          catalogNumber: 'abc123',
        },
        type: 'catalogedUnit',
      },
    ],
    attributes: {},
    type: 'individualGroup',
  },
}

const allAttributesAsEmptyArrays = {
  data: {
    additionalData: [
      {
        attributes: { catalogNumber: 'fefefe' },
        type: 'catalogedUnit',
      },
    ],
    attributes: {
      featureObservations: [],
      identifications: [],
      occurrences: [],
      physicalUnits: [],
    },
    type: 'individualGroup',
  },
}

const validCatalogNumber = '123456'
const validTaxonName = 'Chironectes minimus'

const withIndividualGroup = {
  data: {
    additionalData: [
      {
        attributes: {
          catalogNumber: validCatalogNumber,
        },
        type: 'catalogedUnit',
      },
    ],
    attributes: {
      causeOfDeathStandardized: 'causeOfDeathStandardized',
      causeOfDeathText: 'causeOfDeathText',
      featureObservations: [
        {
          featureObservationText: '21',
          featureObservationType: {
            featureObservationTypeName: 'age',
            id: '1',
          },
        },
      ],
      identifications: [
        {
          identifiedTaxonNameStandardized: validTaxonName,
        },
      ],
      occurrences: [
        {
          collectorsText: 'Ida Li',
          occurrenceDateText: '2017-10-12',
        },
      ],
      originStandardized: 'originStandardized',
      physicalUnits: [
        {
          normalStorageLocationText: 'Stockholm',
          physicalUnitText: 'This is a test',
        },
      ],
    },
    type: 'individualGroup',
  },
}

const badRequestMissingCatalogNumber = {
  data: {
    additionalData: [
      {
        attributes: {},
        type: 'catalogedUnit',
      },
    ],
    attributes: {
      featureObservations: [],
      identifications: [],
      occurrences: [],
      physicalUnits: [],
    },
    type: 'individualGroup',
  },
}

const updateValidIndividualGroup = {
  data: {
    attributes: {
      causeOfDeathStandardized: 'causeOfDeathStandardized',
      causeOfDeathText: 'causeOfDeathText',
      featureObservations: [
        {
          featureObservationText: '22',
          featureObservationType: {
            featureObservationTypeName: 'age',
            id: '1',
          },
        },
      ],
      identifications: [
        {
          identificationText: 'This is a test',
        },
      ],
      occurrences: [
        {
          collectorsText: 'Ida Li',
          occurrenceDateText: '2017-10-12',
        },
        {
          collectorsText: 'Ada Lovelace',
          occurrenceDateText: '2017-11-11',
        },
      ],
      originStandardized: 'originStandardized',
      physicalUnits: [
        {
          catalogedUnit: {
            catalogNumber: validCatalogNumber,
          },
          normalStorageLocationText: 'Stockholm',
          physicalUnitText: 'Updated text',
        },
      ],
    },
    type: 'individualGroup',
  },
}

const fullFormExample = {
  data: {
    additionalData: [
      {
        attributes: {
          catalogNumber: '584028',
        },
        type: 'catalogedUnit',
      },
    ],
    attributes: {
      causeOfDeathStandardized: 'Standardized death cause',
      causeOfDeathText: 'Cause of death ',
      featureObservations: [
        {
          featureObservationText: 'A condition at collecting',
          featureObservationType: {
            featureObservationTypeName: 'conditionAtCollecting',
            id: '2',
          },
        },
        {
          featureObservationAgent: 'JD',
          featureObservationDate: 'A date',
          featureObservationText: 'male',
          featureObservationType: {
            featureObservationTypeName: 'sex',
            id: '1',
          },
          methodText: 'method text',
        },
      ],
      identifications: [
        {
          identificationRemarks: 'some remarks',
          identifiedAsVerbatim: 'Sorex minutus',
          identifiedByAgentText: 'Doe, J.',
          identifiedDateText: 'Date text',
          isCurrentIdentification: true,
        },
      ],
      occurrences: [
        {
          collectorsText: 'Bergström, U',
          dayEnd: 15,
          dayStart: 15,
          establishmentMeansStandardized: 'establishmentMeansStandardized',
          expeditionText: 'Vega Expedition',
          isDeathEvent: true,
          localityInformation: {
            coordinatesVerbatim: 'coord-string',
            curatedLocalities: [
              {
                id: '123',
              },
              {
                id: '125',
              },
            ],
            georeferenceSourcesText: 'georeferenceSourcesText text',
            localityRemarks: 'localityRemarks text',
            localityVerbatim: 'Some localityVerbatim text',
            position: {
              latitude: 'latitude-string',
              longitude: 'longitude-string',
              uncertaintyInMeters: 10,
            },
            verticalPosition: {
              maximumDepthInMeters: 100,
              maximumElevationInMeters: 100,
              minimumDepthInMeters: 20,
              minimumElevationInMeters: 20,
            },
          },
          monthEnd: 1,
          monthStart: 1,
          occurrenceDateText: '15 jan 1986',
          yearEnd: 1986,
          yearStart: 1986,
        },
      ],
      originStandardized: 'Standardized origin',
      physicalUnits: [
        {
          alternateIdentifiersText: 'alternateIdentifiersText',
          catalogedUnit: {
            catalogNumber: '584028',
            publishRecord: true,
            storedUnderTaxonName: 'Sorex minutus',
          },
          normalStorageLocationText: 'normalStorageLocationText',
          physicalUnitText: 'physicalUnitText',
        },
      ],
    },
  },
}

const UNEXPECTED_SUCCESS = 'Call successfull but should have failed'

describe('individualGroup', () => {
  let authToken
  beforeEach(() => {
    return login().then(loginToken => {
      authToken = loginToken
    })
  })

  it('Runs individualGroup tests', () => {
    expect(!!authToken).toBeTruthy()
    expect(1).toBe(1)
  })

  describe('createIndividualGroup', () => {
    it('Succeed with onlyCatalogedUnit', () => {
      return makeTestCall({
        authToken,
        body: onlyCatalogedUnit,
        operationId: 'createIndividualGroup',
      }).then(res => {
        expect(res).toBeTruthy()
      })
    })
    it('Succeed with allAttributesAsEmptyArrays', () => {
      return makeTestCall({
        authToken,
        body: allAttributesAsEmptyArrays,
        operationId: 'createIndividualGroup',
      }).then(res => {
        expect(res).toBeTruthy()
      })
    })

    it('Succeed with individual group', () => {
      return makeTestCall({
        authToken,
        body: withIndividualGroup,
        operationId: 'createIndividualGroup',
      }).then(res => {
        expect(res).toBeTruthy()
      })
    })

    it('Succeed with full form example', () => {
      return makeTestCall({
        authToken,
        body: fullFormExample,
        operationId: 'createIndividualGroup',
      }).then(res => {
        expect(res).toBeTruthy()
        expect(res.data).toBeTruthy()
        expect(res.data.type).toBe('individualGroup')
        expect(res.data.attributes).toBeTruthy()
        expect(res.data.attributes.physicalUnits).toBeTruthy()
        expect(res.data.attributes.featureObservations).toBeTruthy()
        expect(res.data.attributes.identifications).toBeTruthy()
        expect(res.data.attributes.occurrences).toBeTruthy()
      })
    })
    it('Fails create with missing catalog number', () => {
      return makeTestCall({
        authToken,
        body: badRequestMissingCatalogNumber,
        operationId: 'createIndividualGroup',
      })
        .then(() => {
          throw new Error(UNEXPECTED_SUCCESS)
        })
        .catch(err => {
          expect(err.message).not.toBe(UNEXPECTED_SUCCESS)
        })
    })
  })

  describe('updateIndividualGroup', () => {
    let existingId
    beforeEach(() => {
      return makeTestCall({
        authToken,
        body: onlyCatalogedUnit,
        operationId: 'createIndividualGroup',
      }).then(res => {
        existingId = res.data.id
      })
    })
    it('Succeed with valid individualGroup', () => {
      return makeTestCall({
        authToken,
        body: updateValidIndividualGroup,
        operationId: 'updateIndividualGroup',
        pathParams: { id: existingId },
      }).then(res => {
        expect(res).toBeTruthy()
      })
    })
    it('Fails with missing body', () => {
      return makeTestCall({
        authToken,
        operationId: 'updateIndividualGroup',
        pathParams: { id: existingId },
      })
        .then(() => {
          throw new Error(UNEXPECTED_SUCCESS)
        })
        .catch(err => {
          expect(err.message).not.toBe(UNEXPECTED_SUCCESS)
          expect(err).toBeTruthy()
          expect(err.status).toBe(400)
        })
    })
    it('Fails with invalid id', () => {
      return makeTestCall({
        authToken,
        operationId: 'updateIndividualGroup',
        pathParams: { id: '-1' },
      })
        .then(() => {
          throw new Error(UNEXPECTED_SUCCESS)
        })
        .catch(err => {
          expect(err.message).not.toBe(UNEXPECTED_SUCCESS)
          expect(err).toBeTruthy()
          expect(err.status).toBe(400)
        })
    })
  })

  describe('getIndividualGroups', () => {
    describe('by catalogNumber', () => {
      it('Succeed with valid catalogNumber', () => {
        return makeTestCall({
          authToken,
          operationId: 'getIndividualGroups',
          queryParams: { 'filter[catalogNumber]': validCatalogNumber },
        }).then(res => {
          expect(res).toBeTruthy()
          expect(res.data).toBeTruthy()
          expect(Array.isArray(res.data)).toBe(true)
          expect(res.data.length > 0).toBe(true)
        })
      })

      it('Succeed with valid catalogNumber and includes', () => {
        return makeTestCall({
          authToken,
          operationId: 'getIndividualGroups',
          queryParams: {
            'filter[catalogNumber]': validCatalogNumber,
            include: 'identifications,physicalUnits.catalogedUnit',
          },
        }).then(res => {
          expect(res).toBeTruthy()
          expect(res.data).toBeTruthy()
          expect(Array.isArray(res.data)).toBe(true)
          expect(res.data.length > 0).toBe(true)
        })
      })
      it('Succeed with fetching full form example', () => {
        return makeTestCall({
          authToken,
          operationId: 'getIndividualGroups',
          queryParams: {
            'filter[catalogNumber]': '584028',
            include: 'identifications,physicalUnits.catalogedUnit',
          },
        }).then(res => {
          expect(res).toBeTruthy()
          expect(res.data).toBeTruthy()
          expect(Array.isArray(res.data)).toBe(true)
          expect(res.data.length > 0).toBe(true)
        })
      })
    })

    describe('by identifiedTaxonNameStandardized', () => {
      it('Succeed with valid identifiedTaxonNameStandardized', () => {
        return makeTestCall({
          authToken,
          operationId: 'getIndividualGroups',
          queryParams: {
            'filter[identifiedTaxonNameStandardized]': validTaxonName,
          },
        }).then(res => {
          expect(res).toBeTruthy()
          expect(res.data).toBeTruthy()
          expect(Array.isArray(res.data)).toBe(true)
          expect(res.data.length > 0).toBe(true)
        })
      })
      it('Succeed with valid identifiedTaxonNameStandardized and includes', () => {
        return makeTestCall({
          authToken,
          operationId: 'getIndividualGroups',
          queryParams: {
            'filter[identifiedTaxonNameStandardized]': validTaxonName,
            include: 'identifications,physicalUnits.catalogedUnit',
          },
        }).then(res => {
          expect(res).toBeTruthy()
          expect(res.data).toBeTruthy()
          expect(Array.isArray(res.data)).toBe(true)
          expect(res.data.length > 0).toBe(true)
        })
      })
    })
  })
})
