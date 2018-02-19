'use strict';

var getModelNameFromParameter = require('./getModelNameFromParameter');

module.exports = function createBodyValidator(_ref) {
  var createSystemModelSchemaValidator = _ref.createSystemModelSchemaValidator,
      methodSpecification = _ref.methodSpecification;
  var parameters = methodSpecification.parameters;


  if (!parameters) {
    return null;
  }

  var bodyParameter = parameters.find(function (parameterSpecification) {
    return parameterSpecification.in === 'body';
  });

  if (bodyParameter) {
    var modelName = getModelNameFromParameter(bodyParameter);
    return createSystemModelSchemaValidator({
      model: modelName,
      throwOnError: true
    });
  }

  return null;
};