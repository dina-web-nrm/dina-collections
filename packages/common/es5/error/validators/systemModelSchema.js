'use strict';

var _require = require('redux'),
    compose = _require.compose;

var createSchemaValidator = require('../../jsonSchema/createNormalizedValidator');
var systemErrorFactory = require('../errorFactories/system');
var serverErrorFactory = require('../errorFactories/server');
var ajvErrorMapper = require('../errorMappers/ajv');

module.exports = function createSystemModelSchemaValidator(_ref) {
  var context = _ref.context,
      dataPath = _ref.dataPath,
      model = _ref.model,
      _ref$origin = _ref.origin,
      origin = _ref$origin === undefined ? 'client' : _ref$origin,
      schema = _ref.schema,
      throwOnError = _ref.throwOnError;

  var errorHandler = origin === 'server' ? compose(serverErrorFactory({ context: context }), ajvErrorMapper) : compose(systemErrorFactory({ context: context }), ajvErrorMapper);

  return createSchemaValidator({
    dataPath: dataPath,
    errorHandler: errorHandler,
    model: model,
    origin: origin,
    schema: schema,
    throwOnError: throwOnError
  });
};