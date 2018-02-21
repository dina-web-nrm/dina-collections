'use strict';

var createMockGenerator = require('../jsonSchema/createMockGenerator');
var getModelNameFromParameter = require('./getModelNameFromParameter');
var importFaker = require('../jsonSchema/importJsonFakerSync');

module.exports = function createMockFunction(_ref) {
  var methodSpecification = _ref.methodSpecification;

  var response = methodSpecification && methodSpecification.responses && methodSpecification.responses['200'] && methodSpecification.responses['200'].content && methodSpecification.responses['200'].content['application/json'];

  if (!response) {
    return null;
  }
  var model = getModelNameFromParameter(response);
  return createMockGenerator({
    importFaker: importFaker,
    model: model
  });
};