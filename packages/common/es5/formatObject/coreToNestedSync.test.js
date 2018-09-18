'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var coreToNestedSync = require('./coreToNestedSync');

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