'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _values = require('babel-runtime/core-js/object/values');

var _values2 = _interopRequireDefault(_values);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('./index'),
    createApiClient = _require.createApiClient,
    dep = _require.dep;

describe('apiClient', function () {
  it('exports function', function () {
    expect(typeof createApiClient === 'undefined' ? 'undefined' : (0, _typeof3.default)(createApiClient)).toBe('function');
  });

  it('has expected methods', function () {
    var apiClient = createApiClient({});
    var expectedApiClientMethods = ['call', 'downloadFile', 'formPost', 'httpDelete', 'httpGet', 'httpPatch', 'httpPost', 'httpPut'];

    expect((0, _keys2.default)(apiClient).sort()).toEqual(expectedApiClientMethods.sort());
  });

  var expectedCallMethods = ['delete', 'formPost', 'get', 'patch', 'post', 'put'];

  expectedCallMethods.forEach(function (methodName) {
    it('returns function when using call with methodName ' + methodName, function () {
      var apiClient = createApiClient({});
      expect(apiClient.call({ methodName: methodName }).catch(function () {})).toBeInstanceOf(_promise2.default);
    });
  });

  describe('apiClient methods', function () {
    var apiClient = createApiClient({});

    (0, _values2.default)(apiClient).forEach(function (val) {
      it('exports ' + (val.name || val) + ' as function', function () {
        expect(typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)).toEqual('function');
      });
    });
  });

  it('throws for unsupported methodName', function () {
    var apiClient = createApiClient({});

    expect(function () {
      return apiClient.call({ methodName: 'unknown' });
    }).toThrow('unknown is not supported in call');
  });

  describe('with Dependor', function () {
    var validateApiConfig = void 0;
    var createApiMethod = void 0;

    beforeEach(function () {
      validateApiConfig = jest.fn();
      createApiMethod = jest.fn();
      dep.freeze();
      dep.mock({
        createApiMethod: createApiMethod,
        validateApiConfig: validateApiConfig
      });
    });

    afterEach(function () {
      dep.reset();
    });

    it('calls validateApiConfig with expected input', function () {
      var apiConfigInput = {
        baseUrl: 'http://example.com'
      };

      createApiClient(apiConfigInput);

      var apiConfig = (0, _extends3.default)({
        validateInput: true,
        validateOutput: true
      }, apiConfigInput);

      expect(validateApiConfig.mock.calls.length).toEqual(1);
      expect(validateApiConfig.mock.calls[0][0]).toEqual(apiConfig);
    });

    it('calls createApiMethod six times', function () {
      var apiConfigInput = {
        baseUrl: 'http://example.com'
      };

      createApiClient(apiConfigInput);

      expect(createApiMethod.mock.calls.length).toEqual(6);
    });
  });
});