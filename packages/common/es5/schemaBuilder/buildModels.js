'use strict';

var path = require('path');
var read = require('./read');
var write = require('./write');
var createModels = require('./build/models');
var buildEndpoints = require('./build/buildEndpoints');

function buildModels(_ref) {
  var modelBasePath = _ref.modelBasePath,
      apiBasePath = _ref.apiBasePath,
      normalize = _ref.normalize,
      _ref$version = _ref.version,
      version = _ref$version === undefined ? '0.1.0' : _ref$version;

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
    version: version
  });

  write({
    models: cleanModels,
    normalize: normalize,
    setCurrent: true,
    version: version
  });

  write({
    models: cleanModels,
    normalize: normalize
  });
}

buildModels({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  normalize: false
});

buildModels({
  apiBasePath: path.join(__dirname, '../../../backend/src'),
  modelBasePath: path.join(__dirname, '../../../models/src'),
  normalize: true
});