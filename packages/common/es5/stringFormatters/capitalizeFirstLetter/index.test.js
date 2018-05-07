'use strict';

var capitalizeFirstLetter = require('./index');

describe('stringFormatting/capitalizeFirstLetter', function () {
  it('returns string with capital first letter', function () {
    var testValue = capitalizeFirstLetter('capitalize first');
    var expectedResult = 'Capitalize first';

    expect(testValue).toEqual(expectedResult);
  });
});