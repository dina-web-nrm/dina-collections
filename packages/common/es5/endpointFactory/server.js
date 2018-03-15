'use strict';

var createBackendApiClientValidator = require('../error/validators/createBackendApiClientValidator');
var createEndpointFactory = require('./createEndpointFactory');
var importFaker = require('../jsonSchema/importJsonFakerSync');

module.exports = createEndpointFactory({
  createApiClientValidator: createBackendApiClientValidator,
  importFaker: importFaker,
  origin: 'server'
});