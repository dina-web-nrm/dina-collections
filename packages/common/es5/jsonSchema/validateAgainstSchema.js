'use strict';

var createValidator = require('./createValidator');

var defaultOptions = {
  throwOnError: false
};

module.exports = function validateAgainstSchema(schema, object) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultOptions;

  var validator = createValidator({
    options: {
      allErrors: true,

      jsonPointers: true,
      useDefaults: true,
      verbose: false },
    schema: schema,
    throwOnError: options.throwOnError
  });
  return validator(object);
};