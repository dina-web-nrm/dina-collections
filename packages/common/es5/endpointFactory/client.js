'use strict';

var createEndpointFactory = require('./createEndpointFactory');

var importFaker = function importFaker() {
  return import('json-schema-faker');
};

module.exports = createEndpointFactory({ importFaker: importFaker });