'use strict';

var createOpenApi = require('./openApi');
var createModels = require('./models');

module.exports = function build(_ref) {
  var apis = _ref.apis,
      endpoints = _ref.endpoints,
      errors = _ref.errors,
      info = _ref.info,
      models = _ref.models,
      parameters = _ref.parameters,
      security = _ref.security,
      servers = _ref.servers;

  var openApi = createOpenApi({
    apis: apis,
    endpoints: endpoints,
    errors: errors,
    info: info,
    models: models,
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
    parameters: parameters,
    security: security
  });

  return {
    cleanModels: cleanModels,
    openApi: openApi
  };
};