const { dep, splitRelationships } = require('./splitRelationships')

describe('jsonApiClient/utilities/splitRelationships', () => {
  test('returns empty objects if no relationships', () => {
    const testValue = splitRelationships({
      itemResourceType: 'agent',
      relationships: {},
      relationshipsToModify: [],
    })
    const expectedResult = {
      relationshipsToAssociateSeparately: {},
      relationshipsToIncludeInRequest: {},
      relationshipsToNotUpdate: [],
    }

    expect(testValue).toEqual(expectedResult)
  })

  test('returns split relationships', () => {
    dep.mock({
      resourceRelationshipKeysToIncludeInBodyMap: {
        specimen: ['identifierTypes', 'places'],
      },
    })

    const testValue = splitRelationships({
      itemResourceType: 'specimen',
      relationships: {
        agents: { type: 'agent' },
        identifierTypes: { type: 'identifierType' },
        places: { type: 'place' },
      },
      relationshipsToModify: [
        'specimen.agents',
        'specimen.identifierTypes',
        'specimen.places',
      ],
      resourcePath: 'specimen',
    })

    const expectedResult = {
      relationshipsToAssociateSeparately: {
        agents: { type: 'agent' },
      },
      relationshipsToIncludeInRequest: {
        identifierTypes: { type: 'identifierType' },
        places: { type: 'place' },
      },
      relationshipsToNotUpdate: [],
    }

    expect(testValue).toEqual(expectedResult)
  })
})
