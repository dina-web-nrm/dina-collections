'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildPath = require('./buildPath');

module.exports = function createOpenApiPaths(endpoints) {
  return (0, _keys2.default)(endpoints).reduce(function (paths, endpointName) {
    var endpoint = endpoints[endpointName];
    var updatedPaths = (0, _extends6.default)({}, paths);
    if (!updatedPaths[endpoint.path]) {
      updatedPaths = (0, _extends6.default)({}, updatedPaths, (0, _defineProperty3.default)({}, endpoint.path, {}));
    }
    if (updatedPaths[endpoint.path][endpoint.method]) {
      throw new Error('Detected duplicated method: ' + endpoint.method + ' for path: ' + endpoint.path);
    }
    var path = buildPath(endpoint);
    return (0, _extends6.default)({}, updatedPaths, (0, _defineProperty3.default)({}, endpoint.path, (0, _extends6.default)({}, updatedPaths[endpoint.path], (0, _defineProperty3.default)({}, endpoint.method, path))));
  }, {});
};