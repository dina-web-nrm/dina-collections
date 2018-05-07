'use strict';

var models = require('../../dist/normalizedModels.json');
var createMockDataFromSchema = require('./createMockDataFromSchema');

module.exports = function createMockGenerator(_ref) {
  var importFaker = _ref.importFaker,
      model = _ref.model,
      customSchema = _ref.schema;

  if (model && !models[model]) {
    throw new Error('Unknown model: ' + model);
  }

  if (!models[model] && !customSchema) {
    throw new Error('If model not provided have to provide customSchema (key schema)');
  }

  if (!importFaker) {
    throw new Error('Must provide \'importFaker\' method');
  }

  var schema = models[model] || customSchema;
  return function () {
    return createMockDataFromSchema({ importFaker: importFaker, models: models, schema: schema });
  };
};