'use strict';

var path = require('path');
var read = require('./read');
var write = require('./write');
var build = require('./build');

function main(_ref) {
  var modelBasePath = _ref.modelBasePath,
      apiBasePath = _ref.apiBasePath,
      normalize = _ref.normalize;

  var _read = read({
    apiBasePath: apiBasePath,
    modelBasePath: modelBasePath
  }),
      apis = _read.apis,
      endpoints = _read.endpoints,
      errors = _read.errors,
      info = _read.info,
      models = _read.models,
      parameters = _read.parameters,
      security = _read.security,
      servers = _read.servers;

  var _build = build({
    apis: apis,
    endpoints: endpoints,
    errors: errors,
    info: info,
    models: models,
    normalize: normalize,
    parameters: parameters,
    security: security,
    servers: servers
  }),
      cleanModels = _build.cleanModels,
      openApi = _build.openApi;

  write({
    models: cleanModels,
    normalize: normalize,
    openApi: openApi,
    setCurrent: true,
    version: '0.1.0'
  });

  write({
    models: cleanModels,
    normalize: normalize,
    openApi: openApi
  });
}

main({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  normalize: false
});

main({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  normalize: true
});