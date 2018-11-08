'use strict';

var singletons = require('./singletons');
var createSchemaInterface = require('./createSchemaInterface');
var apiInfo = require('../../dist/schemas/apiVersions/current/info.json');
var modelInfo = require('../../dist/schemas/modelVersions/current/info.json');
var models = require('../../dist/schemas/modelVersions/current/models.json');
var normalizedModels = require('../../dist/schemas/modelVersions/current/normalizedModels.json');
var openApiSpec = require('../../dist/schemas/apiVersions/current/openApi.json');

singletons.set({
  apiInfo: apiInfo,
  modelInfo: modelInfo,
  models: models,
  normalizedModels: normalizedModels,
  openApiSpec: openApiSpec
});

module.exports = createSchemaInterface(singletons);