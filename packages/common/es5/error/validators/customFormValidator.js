'use strict';

var createValidatorFactory = require('../../jsonSchema/createValidatorFactory');
var transformToReduxFormError = require('../errorFactories/transformToReduxFormError');
var createParameterErrorsFromAjv = require('../errorFactories/createParameterErrorsFromAjv');

module.exports = function formValidator(_ref) {
  var model = _ref.model,
      models = _ref.models,
      schema = _ref.schema;

  var createSchemaValidator = createValidatorFactory(models);
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