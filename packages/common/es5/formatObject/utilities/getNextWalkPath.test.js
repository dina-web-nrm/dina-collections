'use strict';

var getNextWalkPath = require('./getNextWalkPath');

describe('formatObject/utilities/getNextWalkPath', function () {
  test('returns dot-joined path and first segment', function () {
    var testValue = getNextWalkPath({
      path: 'thisIsNotTheEnd',
      segments: ['itIsNotEvenTheBeginningOfTheEnd', 'butItIsPerhapsTheEndOfTheBeginning']
    });
    var expectedResult = 'thisIsNotTheEnd.itIsNotEvenTheBeginningOfTheEnd';

    expect(testValue).toEqual(expectedResult);
  });
});