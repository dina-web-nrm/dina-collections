'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('child_process'),
    exec = _require.exec;

var createFullCmd = require('./createFullCmd');

module.exports = function execCmd() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      cmdInput = _ref.cmd,
      _ref$execFromRoot = _ref.execFromRoot,
      execFromRoot = _ref$execFromRoot === undefined ? true : _ref$execFromRoot,
      _ref$logFn = _ref.logFn,
      logFn = _ref$logFn === undefined ? false : _ref$logFn,
      _ref$throwOnError = _ref.throwOnError,
      throwOnError = _ref$throwOnError === undefined ? false : _ref$throwOnError;

  if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'test') {
    throw new Error('Only allowed to run in development and test');
  }
  var cmd = createFullCmd({
    cmd: cmdInput,
    execFromRoot: execFromRoot
  });

  return new _promise2.default(function (resolve, reject) {
    if (logFn) {
      logFn('running cmd: ' + cmd);
    }

    exec(cmd, function (err, stdout, stderr) {
      if (logFn) {
        logFn(stdout);
      }

      if (stderr) {
        if (err && throwOnError) {
          return reject(stderr);
        }
        return resolve(stdout + ' \n' + stderr);
      }

      if (err) {
        if (throwOnError) {
          return reject(err);
        }
        return resolve(err);
      }
      return resolve(stdout);
    });
  });
};