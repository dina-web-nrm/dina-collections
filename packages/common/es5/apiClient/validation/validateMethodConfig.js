'use strict';

var methodConfigSchema = require('../schemas/methodConfigSchema');

module.exports = function validateMethodConfig(methodConfigInput, apiConfigInput) {
  var systemValidate = apiConfigInput.systemValidate;


  var error = systemValidate && systemValidate(methodConfigInput, methodConfigSchema);
  if (error) {
    throw error;
  }
};