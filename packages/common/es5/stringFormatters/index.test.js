'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var exportedFunctions = require('./index');

var expectedFunctions = ['capitalizeFirstLetter', 'capitalizeFirstLetterOfEachWord', 'camelCaseToUpperSnakeCase'];

describe('stringFormatters', function () {
  it('exports expected functions', function () {
    expect((0, _keys2.default)(exportedFunctions).sort()).toEqual(expectedFunctions.sort());
  });
});