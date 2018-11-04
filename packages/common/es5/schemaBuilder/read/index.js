'use strict';

var path = require('path');
var readEndpoints = require('./readEndpoints');
var readErrors = require('./readErrors');
var readInfo = require('./readInfo');
var readServers = require('./readServers');
var readModels = require('./readModels');
var readApis = require('./readApis');
var readSecurity = require('./readSecurity');
var createSchemaInterface = require('../../schemaInterface/createSchemaInterface');

module.exports = function read(_ref) {
  var modelBasePath = _ref.modelBasePath,
      apiBasePath = _ref.apiBasePath;

  var servicesPath = path.join(apiBasePath, 'services');
  var buildServicesPath = path.join(apiBasePath, 'lib', 'services');

  var infoPath = apiBasePath;

  var errors = readErrors();
  var info = readInfo(infoPath);
  var models = readModels(modelBasePath);

  var schemaInterface = createSchemaInterface({ getModels: function getModels() {
      return models;
    } });
  var resourceRelationshipParamsMap = schemaInterface.getResourceRelationshipParamsMap();

  var serviceDefinitions = require(servicesPath);
  var buildServices = require(buildServicesPath);
  var services = buildServices({
    resourceRelationshipParamsMap: resourceRelationshipParamsMap,
    serviceDefinitions: serviceDefinitions
  });

  var endpoints = readEndpoints(services);
  var apis = readApis(services);
  var servers = readServers(path.join(apiBasePath, 'info', 'servers'));

  var parameters = {};
  var security = readSecurity();
  return {
    apis: apis,
    endpoints: endpoints,
    errors: errors,
    info: info,
    models: models,
    parameters: parameters,
    security: security,
    servers: servers
  };
};