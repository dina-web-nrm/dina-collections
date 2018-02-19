'use strict';

var createValidator = require('./createValidator');

var defaultOptions = {
  throwOnError: false
};

module.exports = function validateAgainstModel(model, object) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultOptions;

  var validator = createValidator({
    model: model,
    options: {
      allErrors: true,

      jsonPointers: true,
      useDefaults: true,
      verbose: false },
    throwOnError: options.throwOnError
  });
  return validator(object);
};