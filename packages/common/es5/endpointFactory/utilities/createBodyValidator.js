'use strict';

var getModelNameFromSchema = require('./getModelNameFromSchema');
var getSchemaFromRequestBody = require('./getSchemaFromRequestBody');

module.exports = function createBodyValidator(_ref) {
  var createApiClientValidator = _ref.createApiClientValidator,
      methodSpecification = _ref.methodSpecification;

  var schema = getSchemaFromRequestBody(methodSpecification.requestBody);

  if (schema) {
    var modelName = getModelNameFromSchema(schema);

    return createApiClientValidator({
      model: modelName,
      operationId: methodSpecification.operationId,
      type: 'request-body'
    });
  }

  return null;
};