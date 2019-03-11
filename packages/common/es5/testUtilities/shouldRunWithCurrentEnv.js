'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function shouldRunWithCurrentEnv(input) {
  var runInEnv = [];
  var dontRunInEnv = [];
  if (typeof input === 'string') {
    runInEnv = [input];
  } else if ((typeof input === 'undefined' ? 'undefined' : (0, _typeof3.default)(input)) === 'object') {
    runInEnv = input.runInEnv || [];
    dontRunInEnv = input.dontRunInEnv || [];
  } else {
    throw new Error('Provide string or object as input');
  }

  var shouldRun = false;
  shouldRun = runInEnv.every(function (env) {
    if (process.env[env]) {
      return true;
    }
    return false;
  });

  dontRunInEnv.forEach(function (env) {
    if (process.env[env]) {
      shouldRun = false;
    }
  });

  return shouldRun;
};