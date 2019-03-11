'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolveEnvVariable = require('./resolveEnvVariable');

module.exports = function resolveVariables() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$envVariables = _ref.envVariables,
      envVariables = _ref$envVariables === undefined ? [] : _ref$envVariables,
      _ref$nodeEnv = _ref.nodeEnv,
      nodeEnv = _ref$nodeEnv === undefined ? undefined : _ref$nodeEnv,
      processEnv = _ref.processEnv,
      _ref$required = _ref.required,
      required = _ref$required === undefined ? true : _ref$required;

  return envVariables.reduce(function (obj, envKey) {
    var value = resolveEnvVariable({
      envKey: envKey,
      nodeEnv: nodeEnv,
      processEnv: processEnv,
      required: required
    });

    if (value === undefined) {
      return obj;
    }

    return (0, _extends4.default)({}, obj, (0, _defineProperty3.default)({}, envKey, value));
  }, {});
};