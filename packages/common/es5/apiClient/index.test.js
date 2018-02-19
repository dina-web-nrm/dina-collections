'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createApiClient = require('./index');

describe('apiClient', function () {
  it('exports function', function () {
    expect(typeof createApiClient === 'undefined' ? 'undefined' : (0, _typeof3.default)(createApiClient)).toBe('function');
  });

  it('has expected methods', function () {
    var apiClient = createApiClient({});
    var expectedMethods = ['call', 'formPost', 'httpDelete', 'httpGet', 'httpPatch', 'httpPost', 'httpPut'];

    expect((0, _keys2.default)(apiClient).sort()).toEqual(expectedMethods.sort());
  });
});