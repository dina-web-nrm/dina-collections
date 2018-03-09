'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createSchemaValidator = require('../../jsonSchema/createNormalizedValidator');
var backendError = require('../errorFactories/backendError');
var createParameterErrorsFromAjv = require('../errorFactories/createParameterErrorsFromAjv');

var typeOptionMap = {
  'request-body': {
    code: 'REQUEST_BODY_VALIDATION_ERROR',
    status: 400
  },
  'request-path-parameters': {
    code: 'REQUEST_PATH_PARAMETERS_VALIDATION_ERROR',
    status: 400
  },
  'request-query': {
    code: 'REQUEST_QUERY_VALIDATION_ERROR',
    status: 400
  },
  response: {
    code: 'RESPONSE_VALIDATION_ERROR',
    status: 500
  }
};

module.exports = function createBackendApiClientValidator(_ref) {
  var model = _ref.model,
      schema = _ref.schema,
      throwError = _ref.throwError,
      type = _ref.type;

  var options = typeOptionMap[type];
  if (!options) {
    throw new Error('Invalid type: ' + type);
  }

  var source = 'backendApiClientValidator';

  var validator = createSchemaValidator({ model: model, schema: schema });

  return function validate(obj) {
    var ajvErrors = validator(obj);
    if (!ajvErrors) {
      return ajvErrors;
    }

    var parameterErrors = createParameterErrorsFromAjv(ajvErrors);
    var detail = (0, _stringify2.default)(parameterErrors || {});

    return backendError((0, _extends3.default)({}, options, {
      detail: detail,
      model: model,
      parameterErrors: parameterErrors,
      schema: schema,
      source: source,
      throwError: throwError
    }));
  };
};