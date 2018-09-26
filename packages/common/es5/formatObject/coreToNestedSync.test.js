'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var coreToNestedSync = require('./coreToNestedSync');
var apiFormatPhysicalObject = require('./utilities/testData/apiFormatPhysicalObject');
var apiFormatSpecimen = require('./utilities/testData/apiFormatSpecimen');
var nestedPhysicalObjectWithRelationships = require('./utilities/testData/nestedPhysicalObjectWithRelationships');

describe('formatObject/coreToNestedSync', function () {
  it('is a function', function () {
    expect(typeof coreToNestedSync === 'undefined' ? 'undefined' : (0, _typeof3.default)(coreToNestedSync)).toBe('function');
  });
  it('returns falsy item', function () {
    var item = null;
    expect(coreToNestedSync({
      denormalize: true,
      extractRelationships: true,
      item: item,
      type: 'specimen'
    })).toEqual(null);
  });
});