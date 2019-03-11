'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createEnvReader = require('./createEnvReader');

describe('config/createEnvReader', function () {
  it('Is a function', function () {
    expect(typeof createEnvReader === 'undefined' ? 'undefined' : (0, _typeof3.default)(createEnvReader)).toBe('function');
  });

  it('Return object with functions', function () {
    var envReader = createEnvReader();
    expect((0, _typeof3.default)(envReader.readBoolKey)).toBe('function');
    expect((0, _typeof3.default)(envReader.readKey)).toBe('function');
  });
});