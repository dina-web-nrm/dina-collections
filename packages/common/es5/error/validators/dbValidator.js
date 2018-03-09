'use strict';

var createSchemaValidator = require('../../jsonSchema/createNormalizedValidator');
var createParameterErrorsFromAjv = require('../errorFactories/createParameterErrorsFromAjv');

module.exports = function dbValidator(_ref) {
  var model = _ref.model,
      schema = _ref.schema;

  var validator = createSchemaValidator({ model: model, schema: schema });

  return function validate(obj) {
    var ajvErrors = validator(obj);
    if (!ajvErrors) {
      return ajvErrors;
    }

    var parameterErrors = createParameterErrorsFromAjv(ajvErrors);

    return parameterErrors;
  };
};