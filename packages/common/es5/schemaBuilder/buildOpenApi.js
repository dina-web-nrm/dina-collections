'use strict';

var path = require('path');
var read = require('./read');
var write = require('./write');
var createOpenApi = require('./build/openApi');
var buildEndpoints = require('./build/buildEndpoints');

function buildOpenApi(_ref) {
  var apiBasePath = _ref.apiBasePath,
      backendPackagePath = _ref.backendPackagePath,
      modelBasePath = _ref.modelBasePath,
      modelPackagePath = _ref.modelPackagePath,
      normalize = _ref.normalize;

  var modelVersion = require(modelPackagePath).version;
  var backendVersion = require(backendPackagePath).version;

  var apiVersion = modelVersion + '-' + backendVersion;

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
    version: apiVersion
  });

  write({
    apiVersion: apiVersion,
    modelVersion: modelVersion,
    normalize: normalize,
    openApi: openApi
  });
}

buildOpenApi({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  backendPackagePath: path.join(__dirname, '../../../backend/package.json'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  modelPackagePath: path.join(__dirname, '../../../models/package.json'),
  normalize: true
});