'use strict';

var path = require('path');
var readEndpoints = require('./readEndpoints');
var readErrors = require('./readErrors');
var readInfo = require('./readInfo');
var readServers = require('./readServers');
var readModels = require('./readModels');

var readApis = require('./readApis');
var readSecurity = require('./readSecurity');

module.exports = function read(_ref) {
  var modelBasePath = _ref.modelBasePath,
      apiBasePath = _ref.apiBasePath;

  var infoPath = apiBasePath;

  var endpoints = readEndpoints(path.join(apiBasePath, 'apis'));
  var errors = readErrors();
  var info = readInfo(infoPath);
  var models = readModels(modelBasePath);
  var apis = readApis(path.join(apiBasePath, 'apis'));
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