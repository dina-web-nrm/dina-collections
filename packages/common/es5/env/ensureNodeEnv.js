'use strict';

var allowedEnvs = ['production', 'development', 'test'];

module.exports = function ensureNodeEnv(expectedEnvInput) {
  var expectedEnvs = Array.isArray(expectedEnvInput) ? expectedEnvInput : [expectedEnvInput];

  expectedEnvs.forEach(function (expectedEnv) {
    if (!allowedEnvs.includes(expectedEnv)) {
      throw new Error('Unexpected env: ' + expectedEnv + ' Has to be one of: [' + allowedEnvs.join(', ') + ']');
    }
  });

  var currentEnv = process.env.NODE_ENV;

  if (!expectedEnvs.includes(currentEnv)) {
    throw new Error('current env: ' + currentEnv + ' not in expectedEnvs: [' + expectedEnvs.join(', ') + '] ');
  }
};