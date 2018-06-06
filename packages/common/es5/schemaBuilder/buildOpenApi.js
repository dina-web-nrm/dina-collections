'use strict';

var path = require('path');
var read = require('./read');
var write = require('./write');
var createOpenApi = require('./build/openApi');
var buildEndpoints = require('./build/buildEndpoints');

function buildOpenApi(_ref) {
  var modelBasePath = _ref.modelBasePath,
      apiBasePath = _ref.apiBasePath,
      normalize = _ref.normalize,
      _ref$version = _ref.version,
      version = _ref$version === undefined ? '0.1.0' : _ref$version;

  var _read = read({
    apiBasePath: apiBasePath,
    modelBasePath: modelBasePath
  }),
      apis = _read.apis,
      endpointsInput = _read.endpoints,
      errors = _read.errors,
      info = _read.info,
      models = _read.models,
      parameters = _read.parameters,
      security = _read.security,
      servers = _read.servers;

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

  write({
    normalize: normalize,
    openApi: openApi,
    setCurrent: true,
    version: version
  });

  write({
    normalize: normalize,
    openApi: openApi
  });
}

buildOpenApi({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  normalize: false
});

buildOpenApi({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  normalize: true
});