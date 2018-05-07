'use strict';

var models = require('../../dist/normalizedModels.json');
var createValidatorFactory = require('./createValidatorFactory');

module.exports = createValidatorFactory(models);