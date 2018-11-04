'use strict';

var schemaInterface = require('../schemaInterface');
var createValidatorFactory = require('./createValidatorFactory');

var models = schemaInterface.getModels();

module.exports = createValidatorFactory({ models: models });