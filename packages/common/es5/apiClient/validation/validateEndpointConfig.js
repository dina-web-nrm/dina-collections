'use strict';

var endpointConfigSchema = require('../schemas/endpointConfigSchema');

module.exports = function validateEndpointConfig(endpointConfigInput, apiConfigInput) {
  var systemValidate = apiConfigInput.systemValidate;

  var error = systemValidate && systemValidate(endpointConfigInput, endpointConfigSchema);
  if (error) {
    throw error;
  }
};