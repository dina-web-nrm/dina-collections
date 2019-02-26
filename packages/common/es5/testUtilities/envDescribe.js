'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function createEnvDescribe(input) {
  var runInEnv = [];
  var dontRunInEnv = [];
  var envDescribeName = void 0;
  if (typeof input === 'string') {
    runInEnv = [input];
  } else if ((typeof input === 'undefined' ? 'undefined' : (0, _typeof3.default)(input)) === 'object') {
    runInEnv = input.runInEnv || [];
    dontRunInEnv = input.dontRunInEnv || [];
    envDescribeName = input.name || '';
  } else {
    throw new Error('Provide string or object as input');
  }

  var shouldRun = false;
  runInEnv.forEach(function (env) {
    if (process.env[env]) {
      shouldRun = true;
    }
  });

  dontRunInEnv.forEach(function (env) {
    if (process.env[env]) {
      shouldRun = false;
    }
  });

  return function envDescribe(name) {
    if (!shouldRun) {
      return describe(name, function () {
        it('Not running ' + envDescribeName + ' because env requirements not fulfilled: runtInEnv: ' + runInEnv.join(', ') + ' dontRunInEnv: ' + dontRunInEnv.join(', '), function () {
          expect(1).toBe(1);
        });
      });
    }

    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    return describe.apply(undefined, [name].concat(rest));
  };
};