'use strict';

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('stringFormatting/capitalizeFirstLetter', function () {
  it('returns string with capital first letter', function () {
    var testValue = (0, _index2.default)('capitalize first');
    var expectedResult = 'Capitalize first';

    expect(testValue).toEqual(expectedResult);
  });
});