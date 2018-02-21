'use strict';

var _require = require('redux'),
    compose = _require.compose;

var createSchemaValidator = require('../../jsonSchema/createValidator');
var formErrorFactory = require('../errorFactories/form');
var ajvErrorMapper = require('../errorMappers/ajv');

var errorHandler = compose(formErrorFactory, ajvErrorMapper);

module.exports = function createFormModelSchemaValidator(_ref) {
  var model = _ref.model,
      schema = _ref.schema;

  return createSchemaValidator({
    errorHandler: errorHandler,
    model: model,
    schema: schema
  });
};