'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _index = require('./index');

var exportedFunctions = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expectedFunctions = ['capitalizeFirstLetter'];

describe('stringFormatters', function () {
  it('exports expected functions', function () {
    expect((0, _keys2.default)(exportedFunctions).sort()).toEqual(expectedFunctions.sort());
  });
});