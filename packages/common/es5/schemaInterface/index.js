'use strict';

var createSchemaInterface = require('./createSchemaInterface');
var models = require('../../dist/models.json');

module.exports = createSchemaInterface({ models: models });