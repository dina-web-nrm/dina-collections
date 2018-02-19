'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');
var path = require('path');

var buildEndpoint = require('../utilities/buildEndpoint');

module.exports = function readEndpoints(apisBasePath) {
  var apiEndpoints = fs.readdirSync(apisBasePath).filter(function (apiName) {
    var apiPath = path.join(apisBasePath, apiName);
    return fs.statSync(apiPath).isDirectory();
  }).reduce(function (obj, apiName) {
    var endpointPath = path.join(apisBasePath, apiName, 'endpoints');
    return (0, _extends5.default)({}, obj, (0, _defineProperty3.default)({}, apiName, require(endpointPath)));
  }, {});
  return (0, _keys2.default)(apiEndpoints).reduce(function (endpoints, key) {
    var localEndpoints = (0, _keys2.default)(apiEndpoints[key]).reduce(function (obj, operationId) {
      var rawEndpoint = apiEndpoints[key][operationId];
      var endpoint = buildEndpoint((0, _extends5.default)({
        operationId: operationId
      }, rawEndpoint));
      var tags = endpoint.tags ? [].concat((0, _toConsumableArray3.default)(endpoint.tags), [key]) : [key];

      return (0, _extends5.default)({}, obj, (0, _defineProperty3.default)({}, operationId, (0, _extends5.default)({}, endpoint, {
        tags: tags
      })));
    }, {});

    return (0, _extends5.default)({}, endpoints, localEndpoints);
  }, {});
};