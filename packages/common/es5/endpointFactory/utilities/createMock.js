'use strict';

var createMockGenerator = require('../../jsonSchema/createMockGenerator');
var getSchemaFromResponse = require('./getSchemaFromResponse');
var getModelNameFromSchema = require('./getModelNameFromSchema');

module.exports = function createMock(_ref) {
  var importFaker = _ref.importFaker,
      methodSpecification = _ref.methodSpecification;

  var schema = getSchemaFromResponse(methodSpecification.responses[200] || methodSpecification.responses[201]);
  if (schema) {
    var modelName = getModelNameFromSchema(schema);
    if (modelName) {
      return createMockGenerator({
        importFaker: importFaker,
        model: modelName
      });
    }
    return createMockGenerator({
      importFaker: importFaker,
      schema: schema
    });
  }

  return null;
};