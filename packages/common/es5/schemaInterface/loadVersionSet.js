'use strict';

var path = require('path');

module.exports = function loadVersionSet(_ref) {
  var apiVersion = _ref.apiVersion,
      dataModelVersion = _ref.dataModelVersion;

  if (!apiVersion) {
    throw new Error('Provide apiVersion');
  }

  if (!dataModelVersion) {
    throw new Error('Provide dataModelVersion');
  }

  var basePath = path.join(__dirname, '../../dist/schemas/');
  var apiVersionBasePath = path.join(basePath, 'apiVersions', apiVersion);
  var openApiSpecPath = path.join(apiVersionBasePath, 'openApi.json');
  var apiInfoPath = path.join(apiVersionBasePath, 'info.json');

  var modelVersionBasePath = path.join(basePath, 'modelVersions', dataModelVersion);

  var modelsPath = path.join(modelVersionBasePath, 'models.json');
  var normalizedModelsPath = path.join(modelVersionBasePath, 'normalizedModels.json');
  var modelInfoPath = path.join(modelVersionBasePath, 'info.json');

  var apiInfo = require(apiInfoPath);
  var modelInfo = require(modelInfoPath);
  var models = require(modelsPath);
  var normalizedModels = require(normalizedModelsPath);
  var openApiSpec = require(openApiSpecPath);

  return {
    apiInfo: apiInfo,
    modelInfo: modelInfo,
    models: models,
    normalizedModels: normalizedModels,
    openApiSpec: openApiSpec
  };
};