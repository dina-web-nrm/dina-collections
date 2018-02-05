let mockId = 0

export const getIndividualGroup = (queryParams = {}) => {
  mockId += 1
  return {
    attributes: {
      featureObservations: [
        {
          featureObservationText: 'female',
          featureObservationType: {
            featureObservationTypeName: 'sex',
            id: '1',
          },
        },
      ],
      identifications: [
        {
          identificationText: 'Water opossum',
          identifiedByAgentText: 'Doe, J.',
          identifiedTaxonNameStandardized:
            queryParams['filter[identifiedTaxonNameStandardized]'] ||
            'Chironectes minimus',
        },
      ],
      occurrences: [
        {
          id: '1',
          localityInformation: {
            curatedLocalities: [],
            localityVerbatim: 'Hemsö',
          },
        },
      ],
      physicalUnits: [
        {
          catalogedUnit: {
            catalogNumber:
              queryParams['filter[catalogNumber]'] ||
              String(Math.round(100000 + Math.random() * 99999)),
          },
        },
      ],
    },
    id: `${mockId}`,
    type: 'individualGroup',
  }
}

export const createLookupMammalsResponse = ({
  request: { queryParams = {} },
}) => {
  if (
    (queryParams && queryParams['filter[catalogNumber]']) ||
    queryParams['filter[identifiedTaxonNameStandardized]']
  ) {
    return {
      data: [getIndividualGroup(queryParams)],
    }
  }
  return {
    data: [
      getIndividualGroup({
        catalogNumber: '201705001',
        taxonName: 'Lorem ipsum',
      }),
      getIndividualGroup({
        catalogNumber: '201705002',
        taxonName: 'Dolor Sit Amet',
      }),
      getIndividualGroup({
        catalogNumber: '201705003',
        taxonName: 'Consectetur',
      }),
      getIndividualGroup({
        catalogNumber: '201705004',
        taxonName: 'Adipiscing',
      }),
    ],
  }
}
