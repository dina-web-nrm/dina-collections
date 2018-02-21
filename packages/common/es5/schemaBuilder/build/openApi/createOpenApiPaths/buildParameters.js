'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildPathParameters = function buildPathParameters(pathParams) {
  return (0, _keys2.default)(pathParams).map(function (name) {
    return (0, _extends3.default)({
      in: 'path',
      name: name
    }, pathParams[name]);
  }, {});
};

var buildQueryParameters = function buildQueryParameters(queryParams) {
  return (0, _keys2.default)(queryParams).map(function (name) {
    return (0, _extends3.default)({
      in: 'query',
      name: name
    }, queryParams[name]);
  }, {});
};

var buildHeaderParameters = function buildHeaderParameters(headerParams) {
  return (0, _keys2.default)(headerParams).map(function (name) {
    return (0, _extends3.default)({
      in: 'header',
      name: name
    }, headerParams[name]);
  }, {});
};

module.exports = function buildParameters(_ref) {
  var _ref$pathParams = _ref.pathParams,
      pathParams = _ref$pathParams === undefined ? {} : _ref$pathParams,
      _ref$queryParams = _ref.queryParams,
      queryParams = _ref$queryParams === undefined ? {} : _ref$queryParams,
      _ref$headers = _ref.headers,
      headers = _ref$headers === undefined ? {} : _ref$headers;

  return [].concat((0, _toConsumableArray3.default)(buildPathParameters(pathParams)), (0, _toConsumableArray3.default)(buildQueryParameters(queryParams)), (0, _toConsumableArray3.default)(buildHeaderParameters(headers)));
};