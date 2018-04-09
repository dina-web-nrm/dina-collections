import { buildSpecimenBody, getCatalogNumberFromIdentifiers } from './utilities'

describe('dataModules/specimenService/utilities', () => {
  describe('buildSpecimenBody', () => {
    const curatedLocalities = []
    const distinguishedUnitTypes = {
      '1': {
        id: '1',
        type: 'distinguishedUnitType',
      },
      '2': {
        id: '2',
        type: 'distinguishedUnitType',
      },
    }
    const featureObservationTypes = {
      '1': {
        id: '1',
        type: 'featureObservationType',
      },
      '22': {
        id: '22',
        type: 'featureObservationType',
      },
    }

    const distinguishedUnits = [
      {
        distinguishedUnitType: {
          category: 'skin',
          id: '1',
          type: 'distinguishedUnitType',
        },
        physicalUnit: {
          storageLocation: {
            id: '1',
            name: 'skin room',
            type: 'storageLocation',
          },
        },
      },
      {
        distinguishedUnitType: {
          category: 'skeleton',
          id: '2',
          type: 'distinguishedUnitType',
        },
        physicalUnit: {
          storageLocation: {
            id: '2',
            name: 'bone room',
            type: 'storageLocation',
          },
        },
      },
    ]

    const individualGroup = {
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
      distinguishedUnitTypes,
      featureObservationTypes,
      savedPhysicalUnits,
      specimen: {
        distinguishedUnits,
        individualGroup,
      },
      storageLocations,
      taxa,
    })

    const expectedResult = {
      data: {
        attributes: {
          distinguishedUnits: [
            {
              distinguishedUnitType: {
                category: 'skin',
                id: '1',
                type: 'distinguishedUnitType',
              },
              physicalUnit: {
                id: '1',
                storageLocation: {
                  id: '1',
                  type: 'storageLocation',
                },
                type: 'physicalUnit',
              },
            },
            {
              distinguishedUnitType: {
                category: 'skeleton',
                id: '2',
                type: 'distinguishedUnitType',
              },
              physicalUnit: {
                id: '2',
                storageLocation: {
                  id: '2',
                  type: 'storageLocation',
                },
                type: 'physicalUnit',
              },
            },
          ],
          individualGroup: {
            ...individualGroup,
          },
        },
        relationships: {
          curatedLocalities: {
            data: curatedLocalities,
          },
          distinguishedUnitTypes: {
            data: distinguishedUnitTypes,
          },
          featureObservationTypes: {
            data: featureObservationTypes,
          },
          physicalUnits: {
            data: cleanedPhysicalUnits,
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
