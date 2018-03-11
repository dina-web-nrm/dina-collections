'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildEndpoint = require('./utilities/buildEndpoint');
var createOpenApi = require('./openApi');
var createModels = require('./models');

module.exports = function build(_ref) {
  var apis = _ref.apis,
      endpointsInput = _ref.endpoints,
      errors = _ref.errors,
      info = _ref.info,
      models = _ref.models,
      normalize = _ref.normalize,
      parameters = _ref.parameters,
      security = _ref.security,
      servers = _ref.servers;

  var endpoints = (0, _keys2.default)(endpointsInput).reduce(function (obj, operationId) {
    return (0, _extends4.default)({}, obj, (0, _defineProperty3.default)({}, operationId, buildEndpoint(endpointsInput[operationId])));
  }, {});

  var openApi = createOpenApi({
    apis: apis,
    endpoints: endpoints,
    errors: errors,
    info: info,
    models: models,
    normalize: normalize,
    parameters: parameters,
    security: security,
    servers: servers
  });

  var cleanModels = createModels({
    apis: apis,
    endpoints: endpoints,
    errors: errors,
    info: info,
    models: models,
    normalize: normalize,
    parameters: parameters,
    security: security
  });

  return {
    cleanModels: cleanModels,
    openApi: openApi
  };
};