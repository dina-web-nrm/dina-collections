'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildEndpoint = require('../utilities/buildEndpoint');

module.exports = function readEndpoints(services) {
  var endpoints = {};
  (0, _keys2.default)(services).forEach(function (serviceName) {
    var service = services[serviceName];
    var resources = service.resources || {};
    (0, _keys2.default)(resources).forEach(function (resourceName) {
      var resource = resources[resourceName];
      var operations = resource.operations || {};
      (0, _keys2.default)(operations).forEach(function (operationId) {
        var operation = operations[operationId];

        var endpoint = buildEndpoint((0, _extends3.default)({
          operationId: operationId
        }, operation));

        var tags = endpoint.tags ? [].concat((0, _toConsumableArray3.default)(endpoint.tags), [serviceName]) : [serviceName];

        endpoints[operationId] = (0, _extends3.default)({}, endpoint, {
          tags: tags
        });
      });
    });
  });

  return endpoints;
};