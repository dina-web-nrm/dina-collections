'use strict';

var createSchemaValidator = require('../../jsonSchema/createValidator');
var transformToReduxFormError = require('../errorFactories/transformToReduxFormError');
var createParameterErrorsFromAjv = require('../errorFactories/createParameterErrorsFromAjv');

module.exports = function formValidator(_ref) {
  var model = _ref.model,
      schema = _ref.schema;

  var validator = createSchemaValidator({ model: model, schema: schema });

  return function validate(obj) {
    var ajvErrors = validator(obj);
    if (!ajvErrors) {
      return ajvErrors;
    }

    var parameterErrors = createParameterErrorsFromAjv(ajvErrors);
    return transformToReduxFormError({ parameterErrors: parameterErrors });
  };
};