'use strict';

var _require = require('redux'),
    compose = _require.compose;

var createSchemaValidator = require('../../jsonSchema/createValidator');
var formErrorFactory = require('../errorFactories/form');
var ajvErrorMapper = require('../errorMappers/ajv');

var errorHandler = compose(formErrorFactory, ajvErrorMapper);

module.exports = function createFormSchemaValidator(schema) {
  return createSchemaValidator({
    errorHandler: errorHandler,
    schema: schema
  });
};