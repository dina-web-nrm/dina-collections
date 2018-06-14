const { dep, splitRelationships } = require('./splitRelationships')

describe('jsonApiClient/utilities/splitRelationships', () => {
  test('returns empty objects if no relationships', () => {
    const testValue = splitRelationships({
      itemResourceType: 'agent',
      relationships: {},
    })
    const expectedResult = {
      relationshipsToAssociateSeparately: {},
      relationshipsToIncludeInRequest: {},
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
    })

    const expectedResult = {
      relationshipsToAssociateSeparately: {
        agents: { type: 'agent' },
      },
      relationshipsToIncludeInRequest: {
        identifierTypes: { type: 'identifierType' },
        places: { type: 'place' },
      },
    }

    expect(testValue).toEqual(expectedResult)
  })
})
