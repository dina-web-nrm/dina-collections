'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var priorityMap = require('./priorityMap');

module.exports = function createLogMock(context) {
  var scopeLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var createScopedLog = function createScopedLog() {
    return createLogMock(context, scopeLevel + 1);
  };

  return (0, _keys2.default)(priorityMap).reduce(function (log, level) {
    return (0, _extends4.default)({}, log, (0, _defineProperty3.default)({}, level, jest.fn()));
  }, { scope: createScopedLog, scopeLevel: scopeLevel });
};