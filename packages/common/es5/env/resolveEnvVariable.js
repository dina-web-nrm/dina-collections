'use strict';

module.exports = function resolveEnvVariable() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      envKey = _ref.envKey,
      nodeEnv = _ref.nodeEnv,
      processEnv = _ref.processEnv,
      required = _ref.required;

  var value = processEnv[envKey];
  if (required && value === undefined) {
    throw new Error('Env variable: ' + envKey + ' is missing');
  }

  if (value === undefined) {
    return value;
  }

  if (nodeEnv !== undefined) {
    var nodeEnvArray = Array.isArray(nodeEnv) ? nodeEnv : [nodeEnv];
    if (!nodeEnvArray.includes(processEnv.NODE_ENV)) {
      return undefined;
    }
  }

  if (value === 'false') {
    return false;
  }
  if (value === 'true') {
    return true;
  }

  return value;
};