'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var interpolateUrl = require('./interpolateUrl');
var createQueryString = require('./createQueryString');

module.exports = function createUrl(_ref) {
  var apiConfig = _ref.apiConfig,
      endpointConfig = _ref.endpointConfig,
      request = _ref.request;
  var apiBaseUrl = apiConfig.baseUrl;
  var endpointBaseUrl = endpointConfig.baseUrl;


  var baseUrl = endpointBaseUrl || apiBaseUrl;
  var queryParams = request.queryParams,
      pathParams = request.pathParams;


  var pathname = interpolateUrl(endpointConfig.pathname, pathParams);
  var url = queryParams && (0, _keys2.default)(queryParams).length ? pathname + '?' + createQueryString(queryParams) : pathname;

  return baseUrl ? '' + baseUrl + url : url;
};