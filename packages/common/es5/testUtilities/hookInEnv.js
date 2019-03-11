'use strict';

var shouldRunWithCurrentEnv = require('./shouldRunWithCurrentEnv');

module.exports = function createEnvHook(input) {
  return function hookInEnv(hook) {
    if (!shouldRunWithCurrentEnv(input)) {
      return null;
    }

    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    return hook.apply(undefined, rest);
  };
};