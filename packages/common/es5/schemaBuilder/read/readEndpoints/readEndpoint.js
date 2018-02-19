'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildEndpoint = require('../utilities/buildEndpoint');

module.exports = function readEndpoint(_ref) {
  var endpointPath = _ref.endpointPath,
      serverName = _ref.serverName;

  var rawEndpoint = require(endpointPath);
  var endpoint = buildEndpoint(rawEndpoint);

  var tags = endpoint.tags ? [].concat((0, _toConsumableArray3.default)(endpoint.tags), [serverName]) : [serverName];
  return (0, _extends3.default)({}, endpoint, {
    tags: tags
  });
};