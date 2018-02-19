'use strict';

var _require = require('redux'),
    compose = _require.compose;

var createSchemaValidator = require('../../jsonSchema/createValidator');
var systemErrorFactory = require('../errorFactories/system');
var ajvErrorMapper = require('../errorMappers/ajv');

module.exports = function createSystemSchemaValidator(_ref) {
  var context = _ref.context,
      schema = _ref.schema;

  var errorHandler = compose(systemErrorFactory({ context: context }), ajvErrorMapper);
  return createSchemaValidator({
    errorHandler: errorHandler,
    schema: schema
  });
};