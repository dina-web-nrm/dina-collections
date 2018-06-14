'use strict';

var _require = require('./splitRelationships'),
    dep = _require.dep,
    splitRelationships = _require.splitRelationships;

describe('jsonApiClient/utilities/splitRelationships', function () {
  test('returns empty objects if no relationships', function () {
    var testValue = splitRelationships({
      itemResourceType: 'agent',
      relationships: {}
    });
    var expectedResult = {
      relationshipsToAssociateSeparately: {},
      relationshipsToIncludeInRequest: {}
    };

    expect(testValue).toEqual(expectedResult);
  });

  test('returns split relationships', function () {
    dep.mock({
      resourceRelationshipKeysToIncludeInBodyMap: {
        specimen: ['identifierTypes', 'places']
      }
    });

    var testValue = splitRelationships({
      itemResourceType: 'specimen',
      relationships: {
        agents: { type: 'agent' },
        identifierTypes: { type: 'identifierType' },
        places: { type: 'place' }
      }
    });

    var expectedResult = {
      relationshipsToAssociateSeparately: {
        agents: { type: 'agent' }
      },
      relationshipsToIncludeInRequest: {
        identifierTypes: { type: 'identifierType' },
        places: { type: 'place' }
      }
    };

    expect(testValue).toEqual(expectedResult);
  });
});