import { buildSpecimenBody, getCatalogNumberFromIdentifiers } from './utilities'

describe('domainModules/specimenService/utilities', () => {
  describe('buildSpecimenBody', () => {
    const curatedLocalities = []
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
    const individualGroup = {
      distinguishedUnits: [
        {
          physicalUnit: {
            id: '1',
            type: 'physicalUnit',
          },
        },
        {
          physicalUnit: {
            id: '2',
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
    const savedPhysicalUnits = [
      {
        id: '1',
        storedUnderTaxonName: 'Chironectes minimus',
        type: 'physicalUnit',
      },
      {
        id: '2',
        storedUnderTaxonName: 'Sorex minutus',
        type: 'physicalUnit',
      },
    ]

    const cleanedPhysicalUnits = [
      {
        id: '1',
        type: 'physicalUnit',
      },
      {
        id: '2',
        type: 'physicalUnit',
      },
    ]

    const testValue = buildSpecimenBody({
      curatedLocalities,
      featureObservationTypes,
      individualGroup,
      savedPhysicalUnits,
    })
    const expectedResult = {
      data: {
        attributes: {
          individualGroup: {
            ...individualGroup,
            distinguishedUnits: [
              {
                physicalUnit: {
                  id: '1',
                  type: 'physicalUnit',
                },
              },
              {
                physicalUnit: {
                  id: '2',
                  type: 'physicalUnit',
                },
              },
            ],
          },
        },
        relationships: {
          curatedLocalities: {
            data: curatedLocalities,
          },
          featureObservationTypes: {
            data: featureObservationTypes,
          },
          physicalUnits: {
            data: cleanedPhysicalUnits,
          },
        },
        type: 'specimen',
      },
    }

    expect(testValue).toEqual(expectedResult)
  })
  describe('getCatalogNumberFromIdentifiers', () => {
    it('returns catalogNumber', () => {
      const identifiers = [
        { identifier: { identifierType: 'other', value: 'abc' } },
        { identifier: { identifierType: 'catalogNumber', value: '123456' } },
      ]
      expect(getCatalogNumberFromIdentifiers(identifiers)).toEqual('123456')
    })
  })
})
