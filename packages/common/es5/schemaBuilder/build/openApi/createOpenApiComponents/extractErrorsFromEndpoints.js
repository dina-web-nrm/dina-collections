'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorCodeMap = require('../../../../error/constants/errorCodes');
var errorStatus = require('../../../../error/constants/errorStatus');

var createBaseError = function createBaseError() {
  return {
    properties: {
      description: {
        description: 'Description of the returned code',
        type: 'string'
      },
      detail: {
        description: 'A human-readable explanation specific to this occurrence of the problem.',
        type: 'string'
      },
      id: {
        description: 'A unique identifier for this particular occurrence of the problem.',
        type: 'string'
      },
      message: { type: 'string' },
      parameterErrors: { type: 'string' },
      title: {
        description: 'A short, human-readable summary of the problem. Associated with the code',
        type: 'string'
      }
    },
    required: ['status', 'code'],
    title: 'Base error',
    type: 'object'
  };
};

var createError = function createError(status, errorCodes) {
  errorCodes.forEach(function (code) {
    if (!errorCodeMap[code]) {
      throw new Error('Unknown errorCode for code ' + code);
    }
  });

  if (!errorStatus[status]) {
    throw new Error('Unknown errorStatus for status: ' + status);
  }
  var title = errorStatus[status].title;


  return {
    allOf: [{
      $ref: '#/components/schemas/BaseError'
    }, {
      properties: {
        code: {
          oneOf: errorCodes.map(function (errorCode) {
            return { $ref: '#/components/schemas/' + errorCode };
          })
        },
        status: { $ref: '#/components/schemas/' + status }
      },
      type: 'object'
    }],
    title: title,
    type: 'object'
  };
};

var buildStatusModel = function buildStatusModel(status) {
  var title = errorStatus[status].title;

  return {
    description: title,
    example: status,
    title: status,
    type: 'integer'
  };
};

var buildErrorCodeModel = function buildErrorCodeModel(errorCode) {
  var description = errorCodeMap[errorCode].description;

  return {
    description: description,
    example: errorCode,
    title: errorCode,
    type: 'string'
  };
};

module.exports = function extractErrorsFromEndpoints(_ref) {
  var endpoints = _ref.endpoints;

  var errorModels = {
    BaseError: createBaseError()
  };

  (0, _keys2.default)(endpoints).forEach(function (endpointName) {
    var endpoint = endpoints[endpointName];
    if (!endpoint.errors) {
      return errorModels;
    }

    (0, _keys2.default)(endpoint.errors).forEach(function (status) {
      if (!errorModels[status]) {
        errorModels[status] = buildStatusModel(status);
      }
      var errorCodes = endpoint.errors[status];
      errorCodes.forEach(function (errorCode) {
        if (!errorModels[errorCode]) {
          errorModels[errorCode] = buildErrorCodeModel(errorCode);
        }
      });

      var key = endpoint.operationId + '-' + status;
      var error = createError(status, errorCodes);
      errorModels[key] = error;
    });
    return errorModels;
  });

  return errorModels;
};