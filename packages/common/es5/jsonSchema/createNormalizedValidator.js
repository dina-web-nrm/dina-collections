'use strict';

var schemaInterface = require('../schemaInterface');
var createValidatorFactory = require('./createValidatorFactory');

var normalizedModels = schemaInterface.getNormalizedModels();

module.exports = createValidatorFactory({ models: normalizedModels });