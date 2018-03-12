'use strict';

var getSchemaFromResponse = require('./getSchemaFromResponse');
var getModelNameFromSchema = require('./getModelNameFromSchema');

module.exports = function getResponseValidator(_ref) {
  var createApiClientValidator = _ref.createApiClientValidator,
      methodSpecification = _ref.methodSpecification;

  var schema = getSchemaFromResponse(methodSpecification.responses[200] || methodSpecification.responses[201]);
  if (schema) {
    var modelName = getModelNameFromSchema(schema);
    return createApiClientValidator({
      model: modelName,
      schema: schema,
      type: 'response'
    });
  }

  return null;
};