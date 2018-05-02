'use strict';

var createOpenApiClient = require('../openApiClient');

module.exports = function createJsonApiClient(_ref) {
  var apiConfigInput = _ref.apiConfigInput,
      createEndpoint = _ref.createEndpoint;

  return createOpenApiClient({
    apiConfigInput: apiConfigInput,
    createEndpoint: createEndpoint
  });
};