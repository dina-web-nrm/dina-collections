'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = require('debug');

var priorityMap = require('./priorityMap');

var scopeMessage = function scopeMessage(message, scopeLevel) {
  if (!scopeLevel) {
    return message;
  }

  var scopeString = '';
  for (var i = 1; i < scopeLevel; i += 1) {
    scopeString = scopeString + ' |';
  }

  return scopeString + ' \u2514\u2500\u2500 ' + message;
};

var createLevelLogFunction = function createLevelLogFunction(_ref) {
  var APP_PREFIX = _ref.APP_PREFIX,
      context = _ref.context,
      output = _ref.output,
      priority = _ref.priority,
      scopeLevel = _ref.scopeLevel;

  var log = debug(APP_PREFIX + ':' + priority + ':' + context);
  if (output === 'log') {
    log.log = console.log.bind(console);
  }
  if (output === 'error') {
    log.log = console.error.bind(console);
  }
  var logFunction = function logFunction(message) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }

    log.apply(undefined, [scopeMessage(message, scopeLevel)].concat(rest));
  };

  return logFunction;
};

module.exports = function () {
  var APP_PREFIX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'DINA';

  return function createLog(context) {
    var scopeLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    var createScopedLog = function createScopedLog() {
      return createLog(context, scopeLevel + 1);
    };

    return (0, _keys2.default)(priorityMap).reduce(function (log, level) {
      var _priorityMap$level = priorityMap[level],
          priority = _priorityMap$level.priority,
          output = _priorityMap$level.output;


      return (0, _extends4.default)({}, log, (0, _defineProperty3.default)({}, level, createLevelLogFunction({
        APP_PREFIX: APP_PREFIX,
        context: context,
        output: output,
        priority: priority,
        scopeLevel: scopeLevel
      })));
    }, { scope: createScopedLog, scopeLevel: scopeLevel });
  };
};