'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nestedToCoreSync = require('./nestedToCoreSync');

describe('formatObject/nestedToCoreSync', function () {
  test('is a function', function () {
    expect(typeof nestedToCoreSync === 'undefined' ? 'undefined' : (0, _typeof3.default)(nestedToCoreSync)).toBe('function');
  });
});