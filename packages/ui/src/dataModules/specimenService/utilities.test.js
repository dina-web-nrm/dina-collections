import { buildSpecimenBody, getCatalogNumberFromIdentifiers } from './utilities'

describe('dataModules/specimenService/utilities', () => {
  describe('buildSpecimenBody', () => {
    const places = []
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
        physicalObject: {
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
        physicalObject: {
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
      determinations: [
        {
          taxonNameStandardized: 'Chironectes minimus',
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
    const savedPhysicalObjects = [
      {
        id: '1',
        storageLocation: {
          id: '1',
          name: 'skin room',
          type: 'storageLocation',
        },
        type: 'physicalObject',
      },
      {
        id: '2',
        storageLocation: {
          id: '2',
          name: 'bone room',
          type: 'storageLocation',
        },
        type: 'physicalObject',
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

    const cleanedPhysicalObjects = [
      {
        id: '1',
        storageLocation: {
          id: '1',
          type: 'storageLocation',
        },
        type: 'physicalObject',
      },
      {
        id: '2',
        storageLocation: {
          id: '2',
          type: 'storageLocation',
        },
        type: 'physicalObject',
      },
    ]

    const testValue = buildSpecimenBody({
      featureTypes,
      places,
      preparationTypes,
      savedPhysicalObjects,
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
              physicalObject: {
                id: '1',
                storageLocation: {
                  id: '1',
                  type: 'storageLocation',
                },
                type: 'physicalObject',
              },
              preparationType: {
                category: 'skin',
                id: '1',
                type: 'preparationType',
              },
            },
            {
              physicalObject: {
                id: '2',
                storageLocation: {
                  id: '2',
                  type: 'storageLocation',
                },
                type: 'physicalObject',
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
          featureTypes: {
            data: featureTypes,
          },
          physicalObjects: {
            data: cleanedPhysicalObjects,
          },
          places: {
            data: places,
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
        { identifierType: 'other', value: 'abc' },
        { identifierType: 'catalogNumber', value: '123456' },
      ]
      expect(getCatalogNumberFromIdentifiers(identifiers)).toEqual('123456')
    })
  })
})
