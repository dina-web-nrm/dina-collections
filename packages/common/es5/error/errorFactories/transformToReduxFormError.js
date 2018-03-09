'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectPath = require('object-path');

var createReduxFormParameterError = function createReduxFormParameterError(transformedAjvError) {
  var fullPath = transformedAjvError.fullPath,
      errorCode = transformedAjvError.errorCode,
      params = transformedAjvError.params;

  return {
    errorCode: errorCode,
    fullPath: fullPath,
    params: (0, _extends3.default)({
      fullPath: fullPath
    }, params)
  };
};

var isGeneralSchemaError = function isGeneralSchemaError(transformedAjvError) {
  if (transformedAjvError.errorCode === 'ADDITIONAL_PROPERTIES') {
    return true;
  }
  return !transformedAjvError.fullPath;
};

module.exports = function transformToReduxFormError(_ref) {
  var parameterErrors = _ref.parameterErrors;

  return parameterErrors.reduce(function (reduxFormError, transformedAjvError) {
    var reduxFormParameterError = createReduxFormParameterError(transformedAjvError);

    if (isGeneralSchemaError(transformedAjvError)) {
      objectPath.set(reduxFormError, 'schemaErrors', [].concat((0, _toConsumableArray3.default)(reduxFormError.schemaErrors), [reduxFormParameterError]));

      return reduxFormError;
    }

    var fullPath = transformedAjvError.fullPath;

    objectPath.set(reduxFormError, fullPath, reduxFormParameterError);
    return reduxFormError;
  }, {
    schemaErrors: []
  });
};