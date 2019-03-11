'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolveEnvVariables = require('./resolveEnvVariables');

module.exports = function createEnvReader() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$envDefinitions = _ref.envDefinitions,
      envDefinitions = _ref$envDefinitions === undefined ? {} : _ref$envDefinitions,
      processEnv = _ref.processEnv;

  var _envDefinitions$devVa = envDefinitions.devVariables,
      devVariables = _envDefinitions$devVa === undefined ? [] : _envDefinitions$devVa,
      _envDefinitions$optio = envDefinitions.optionalEnvVariables,
      optionalEnvVariables = _envDefinitions$optio === undefined ? [] : _envDefinitions$optio,
      _envDefinitions$requi = envDefinitions.requiredEnvVariables,
      requiredEnvVariables = _envDefinitions$requi === undefined ? [] : _envDefinitions$requi,
      _envDefinitions$testV = envDefinitions.testVariables,
      testVariables = _envDefinitions$testV === undefined ? [] : _envDefinitions$testV;


  var requiredEnv = resolveEnvVariables({
    envVariables: requiredEnvVariables,
    processEnv: processEnv,
    required: true
  });

  var optionalEnv = resolveEnvVariables({
    envVariables: devVariables,
    nodeEnv: ['development', 'test'],
    processEnv: processEnv,
    required: false
  });

  var devEnv = resolveEnvVariables({
    envVariables: optionalEnvVariables,
    processEnv: processEnv,
    required: false
  });

  var testEnv = resolveEnvVariables({
    envVariables: testVariables,
    nodeEnv: 'test',
    processEnv: processEnv,
    required: false
  });

  var existingEnvVarialbes = [].concat((0, _toConsumableArray3.default)(requiredEnvVariables), (0, _toConsumableArray3.default)(devVariables), (0, _toConsumableArray3.default)(optionalEnvVariables), (0, _toConsumableArray3.default)(testVariables));

  var resolvedEnvVariables = (0, _extends3.default)({}, devEnv, optionalEnv, requiredEnv, testEnv);

  function readKey(key) {
    if (!existingEnvVarialbes.includes(key)) {
      throw new Error('Trying to access non existing env varable: ' + key);
    }
    return resolvedEnvVariables[key];
  }

  function readBoolKey(key) {
    return readKey(key) === true;
  }

  return {
    readBoolKey: readBoolKey,
    readKey: readKey
  };
};