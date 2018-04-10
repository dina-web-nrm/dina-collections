import { buildSpecimenBody, getCatalogNumberFromIdentifiers } from './utilities'

describe('dataModules/specimenService/utilities', () => {
  describe('buildSpecimenBody', () => {
    const curatedLocalities = []
    const preparationTypes = {
      '1': {
        id: '1',
        type: 'preparationType',
      },
      '2': {
        id: '2',
        type: 'preparationType',
      },
    }
    const featureTypes = {
      '1': {
        id: '1',
        type: 'featureType',
      },
      '22': {
        id: '22',
        type: 'featureType',
      },
    }

    const collectionItems = [
      {
        physicalUnit: {
          storageLocation: {
            id: '1',
            name: 'skin room',
            type: 'storageLocation',
          },
        },
        preparationType: {
          category: 'skin',
          id: '1',
          type: 'preparationType',
        },
      },
      {
        physicalUnit: {
          storageLocation: {
            id: '2',
            name: 'bone room',
            type: 'storageLocation',
          },
        },
        preparationType: {
          category: 'skeleton',
          id: '2',
          type: 'preparationType',
        },
      },
    ]

    const individual = {
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
        storageLocation: {
          id: '1',
          name: 'skin room',
          type: 'storageLocation',
        },
        type: 'physicalUnit',
      },
      {
        id: '2',
        storageLocation: {
          id: '2',
          name: 'bone room',
          type: 'storageLocation',
        },
        type: 'physicalUnit',
      },
    ]
    const storageLocations = [
      {
        id: '1',
        type: 'storageLocation',
      },
      {
        id: '2',
        type: 'storageLocation',
      },
    ]
    const taxa = [
      {
        id: '2367',
        type: 'taxon',
      },
    ]

    const cleanedPhysicalUnits = [
      {
        id: '1',
        storageLocation: {
          id: '1',
          type: 'storageLocation',
        },
        type: 'physicalUnit',
      },
      {
        id: '2',
        storageLocation: {
          id: '2',
          type: 'storageLocation',
        },
        type: 'physicalUnit',
      },
    ]

    const testValue = buildSpecimenBody({
      curatedLocalities,
      featureTypes,
      preparationTypes,
      savedPhysicalUnits,
      specimen: {
        collectionItems,
        individual,
      },
      storageLocations,
      taxa,
    })

    const expectedResult = {
      data: {
        attributes: {
          collectionItems: [
            {
              physicalUnit: {
                id: '1',
                storageLocation: {
                  id: '1',
                  type: 'storageLocation',
                },
                type: 'physicalUnit',
              },
              preparationType: {
                category: 'skin',
                id: '1',
                type: 'preparationType',
              },
            },
            {
              physicalUnit: {
                id: '2',
                storageLocation: {
                  id: '2',
                  type: 'storageLocation',
                },
                type: 'physicalUnit',
              },
              preparationType: {
                category: 'skeleton',
                id: '2',
                type: 'preparationType',
              },
            },
          ],
          individual: {
            ...individual,
          },
        },
        relationships: {
          curatedLocalities: {
            data: curatedLocalities,
          },
          featureTypes: {
            data: featureTypes,
          },
          physicalUnits: {
            data: cleanedPhysicalUnits,
          },
          preparationTypes: {
            data: preparationTypes,
          },
          storageLocations: {
            data: storageLocations,
          },
          taxa: {
            data: taxa,
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
