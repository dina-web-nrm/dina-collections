let mockId = 0

export const getSpecimen = (queryParams = {}) => {
  mockId += 1
  return {
    attributes: {
      individualGroup: {
        assignedTaxon: {
          determinations: [
            {
              taxonNameStandardized: 'Chironectes minimus',
            },
          ],
        },
        featureObservations: [
          {
            featureObservationText: 'female',
            featureObservationType: {
              id: '1',
              typeName: 'sex',
            },
          },
        ],
        identifiableUnits: [
          {
            physicalUnit: {
              storedUnderTaxonName: 'Chironectes minimus',
            },
          },
        ],
        identifiers: [
          {
            identifier: {
              identifierType: 'catalogNumber',
              value:
                queryParams['filter[catalogNumber]'] ||
                String(Math.round(100000 + Math.random() * 99999)),
            },
          },
        ],
      },
    },
    id: `${mockId}`,
    type: 'specimen',
  }
}

export const createLookupMammalsResponse = ({
  request: { queryParams = {} },
}) => {
  if (
    (queryParams && queryParams['filter[catalogNumber]']) ||
    queryParams['filter[taxonNameStandardized]']
  ) {
    return {
      data: [getSpecimen(queryParams)],
    }
  }
  return {
    data: [
      getSpecimen({
        catalogNumber: '201705001',
        taxonName: 'Lorem ipsum',
      }),
      getSpecimen({
        catalogNumber: '201705002',
        taxonName: 'Dolor Sit Amet',
      }),
      getSpecimen({
        catalogNumber: '201705003',
        taxonName: 'Consectetur',
      }),
      getSpecimen({
        catalogNumber: '201705004',
        taxonName: 'Adipiscing',
      }),
    ],
  }
}
