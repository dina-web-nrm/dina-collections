'use strict';

var createFrontendApiClientValidator = require('../error/validators/createFrontendApiClientValidator');
var createEndpointFactory = require('./createEndpointFactory');

var importFaker = function importFaker() {
  return import('json-schema-faker');
};

module.exports = createEndpointFactory({
  createApiClientValidator: createFrontendApiClientValidator,
  importFaker: importFaker
});