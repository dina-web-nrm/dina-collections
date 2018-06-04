'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var testData = require('../testData/index.json');
var collectingLocation = require('./collectingLocation');

describe('search/specimen/mapFunctions/collectingLocation', function () {
  it('is a function', function () {
    expect(typeof collectingLocation === 'undefined' ? 'undefined' : (0, _typeof3.default)(collectingLocation)).toBe('function');
  });

  it('map testData', function () {
    var src = testData[0];
    var target = {};
    collectingLocation({ src: src, target: target });
    expect(target).toEqual({
      collectingLocation: {
        locationN: 'South America',
        locationT: 'Sydamerika',
        place: 'South America'
      }
    });
  });
});