'use strict';

var shouldRunWithCurrentEnv = require('./shouldRunWithCurrentEnv');

module.exports = function createEnvDescribe(input) {
  return function describeInEnv(name) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    if (!shouldRunWithCurrentEnv(input)) {
      var _describe;

      return (_describe = describe).skip.apply(_describe, [name].concat(rest));
    }
    return describe.apply(undefined, [name].concat(rest));
  };
};