'use strict';

var path = require('path');

var readModels = require('../schemaBuilder/read/readModels');
var createSchemaInterface = require('./createSchemaInterface');

var modelBasePath = path.join(__dirname, '../../../models/src');
var models = readModels(modelBasePath);

module.exports = createSchemaInterface({ models: models });