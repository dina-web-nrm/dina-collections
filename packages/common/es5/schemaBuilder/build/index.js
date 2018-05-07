'use strict';

var buildEndpoints = require('./buildEndpoints');
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
      servers = _ref.servers,
      version = _ref.version;

  var endpoints = buildEndpoints(endpointsInput);

  var openApi = createOpenApi({
    apis: apis,
    endpoints: endpoints,
    errors: errors,
    info: info,
    models: models,
    normalize: normalize,
    parameters: parameters,
    security: security,
    servers: servers,
    version: version
  });

  var cleanModels = createModels({
    apis: apis,
    endpoints: endpoints,
    errors: errors,
    info: info,
    models: models,
    normalize: normalize,
    parameters: parameters,
    security: security,
    version: version
  });

  return {
    cleanModels: cleanModels,
    openApi: openApi
  };
};