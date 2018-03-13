'use strict';

var getSchemaFromResponse = require('./getSchemaFromResponse');
var getModelNameFromSchema = require('./getModelNameFromSchema');

module.exports = function getExamplesFromMethodSpecifiction(_ref) {
  var methodSpecification = _ref.methodSpecification,
      openApiSpec = _ref.openApiSpec;

  var schema = getSchemaFromResponse(methodSpecification.responses[200] || methodSpecification.responses[201]);
  if (!schema) {
    return null;
  }

  var modelName = getModelNameFromSchema(schema);
  if (!modelName) {
    return null;
  }

  return openApiSpec && openApiSpec.components && openApiSpec.components.schemas && openApiSpec.components.schemas[modelName] && openApiSpec.components.schemas[modelName]['x-examples'];
};