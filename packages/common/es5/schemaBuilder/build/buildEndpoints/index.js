'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildEndpoint = require('./buildEndpoint');

module.exports = function buildEndpoints(endpointSpecification) {
  return (0, _keys2.default)(endpointSpecification).reduce(function (obj, operationId) {
    return (0, _extends4.default)({}, obj, (0, _defineProperty3.default)({}, operationId, buildEndpoint(endpointSpecification[operationId])));
  }, {});
};