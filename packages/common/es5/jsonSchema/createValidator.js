'use strict';

var models = require('../../dist/models.json');
var createValidatorFactory = require('./createValidatorFactory');

module.exports = createValidatorFactory(models);