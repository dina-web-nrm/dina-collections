'use strict';

var models = {};
var normalizedModels = {};
var openApiSpec = {};
var modelInfo = {};
var apiInfo = {};
var initialized = false;

exports.set = function (_ref) {
  var apiInfoInput = _ref.apiInfo,
      modelInfoInput = _ref.modelInfo,
      openApiSpecInput = _ref.openApiSpec,
      modelsInput = _ref.models,
      normalizedModelsInput = _ref.normalizedModels;

  if (!apiInfo) {
    throw new Error('api info required');
  }

  if (!modelInfo) {
    throw new Error('modelInfo info required');
  }

  if (!models) {
    throw new Error('models required');
  }

  if (!normalizedModels) {
    throw new Error('models required');
  }

  if (!openApiSpec) {
    throw new Error('openApiSpec required');
  }

  models = modelsInput;
  normalizedModels = normalizedModelsInput;
  openApiSpec = openApiSpecInput;
  apiInfo = apiInfoInput;
  modelInfo = modelInfoInput;
  initialized = true;
};

var ensureInitialized = function ensureInitialized() {
  if (!initialized) {
    throw new Error('Schema interface not initialized');
  }
};

exports.getModels = function () {
  ensureInitialized();
  return models;
};

exports.getNormalizedModels = function () {
  ensureInitialized();
  return normalizedModels;
};

exports.getOpenApiSpec = function () {
  ensureInitialized();
  return openApiSpec;
};

exports.getModelInfo = function () {
  ensureInitialized();
  return modelInfo;
};

exports.getApiInfo = function () {
  ensureInitialized();
  return apiInfo;
};