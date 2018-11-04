'use strict';

var path = require('path');
var read = require('./read');
var write = require('./write');
var createModels = require('./build/models');
var buildEndpoints = require('./build/buildEndpoints');

function buildModels(_ref) {
  var apiBasePath = _ref.apiBasePath,
      modelBasePath = _ref.modelBasePath,
      modelPackagePath = _ref.modelPackagePath,
      normalize = _ref.normalize;

  var modelVersion = require(modelPackagePath).version;
  var _read = read({
    apiBasePath: apiBasePath,
    modelBasePath: modelBasePath
  }),
      endpointsInput = _read.endpoints,
      models = _read.models;

  var endpoints = buildEndpoints(endpointsInput);

  var cleanModels = createModels({
    endpoints: endpoints,
    models: models,
    normalize: normalize,
    version: modelVersion
  });

  write({
    models: cleanModels,
    modelVersion: modelVersion,
    normalize: normalize
  });
}

buildModels({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  modelPackagePath: path.join(__dirname, '../../../models/package.json'),
  normalize: false
});

buildModels({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  modelPackagePath: path.join(__dirname, '../../../models/package.json'),
  normalize: true
});