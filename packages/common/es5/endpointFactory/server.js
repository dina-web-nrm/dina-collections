'use strict';

var createEndpointFactory = require('./createEndpointFactory');
var importFaker = require('../jsonSchema/importJsonFakerSync');

module.exports = createEndpointFactory({ importFaker: importFaker, origin: 'server' });