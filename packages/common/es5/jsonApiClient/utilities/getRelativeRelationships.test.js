'use strict';

var _require = require('./getRelativeRelationships'),
    getRelativeRelationships = _require.getRelativeRelationships;

describe('jsonApiClient/utilities/getRelativeRelationships', function () {
  test('returns undefined if path is undefined', function () {
    var testValue = getRelativeRelationships({
      path: undefined,
      relationSpecification: undefined
    });
    var expectedResult = undefined;

    expect(testValue).toEqual(expectedResult);
  });

  test('returns undefined if relationSpecification is undefined', function () {
    var testValue = getRelativeRelationships({
      path: '.',
      relationSpecification: undefined
    });
    var expectedResult = undefined;

    expect(testValue).toEqual(expectedResult);
  });

  test('returns undefined if there are no values in relationSpecification', function () {
    var testValue = getRelativeRelationships({
      path: '.',
      relationSpecification: {}
    });
    var expectedResult = undefined;

    expect(testValue).toEqual(expectedResult);
  });

  test('returns array of relationSpecification keys with defined values', function () {
    var testValue = getRelativeRelationships({
      path: '.',
      relationSpecification: {
        normalizedAgents: [],
        notDefined: undefined,
        users: []
      }
    });
    var expectedResult = ['normalizedAgents', 'users'];

    expect(testValue).toEqual(expectedResult);
  });
});