'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorCodes = {
  CONFIG_ERROR: {
    description: 'Something is wrong with configuration. See details',
    title: 'Config error'
  },
  FORBIDDEN_ERROR: {
    description: 'See details',
    title: 'Forbidden error'
  },
  INTERNAL_SERVER_ERROR: {
    description: 'Error occurred on server',
    title: 'Internal server error'
  },
  INTERNAL_SERVER_ERROR_INVALID_ERROR_CODE: {
    description: 'Error occurred on server. Tried to throw an error with an invalid error code',
    title: 'Internal server error'
  },
  INTERNAL_SERVER_ERROR_INVALID_STATUS_CODE: {
    description: 'Error occurred on server. Tried to throw an error with an invalid status code',
    title: 'Internal server error'
  },
  MODEL_WRAPPER_INPUT_ERROR: {
    description: 'Something went wrong in the model layer. See details',
    title: 'Model error'
  },
  MODEL_WRAPPER_OUTPUT_ERROR: {
    description: 'Something went wrong in the model layer. See details',
    title: 'Model error'
  },
  NOT_FOUND_ERROR: {
    description: 'See details',
    title: 'Not found error'
  },
  REQUEST_BODY_VALIDATION_ERROR: {
    description: 'Input body does not pass validations',
    title: 'Request body validation error'
  },
  REQUEST_ERROR: {
    description: 'Something is wrong with the request. See details',
    title: 'Request error'
  },
  REQUEST_QUERY_VALIDATION_ERROR: {
    description: 'Query params does not pass validations',
    title: 'Query validation error'
  },
  RESOURCE_NOT_FOUND_ERROR: {
    description: 'Requested resource not found. See details',
    title: 'Not found error'
  },
  RESPONSE_VALIDATION_ERROR: {
    description: 'Output does not pass validations',
    title: 'Response validation error'
  }
};

module.exports = (0, _keys2.default)(errorCodes).reduce(function (obj, key) {
  return (0, _extends4.default)({}, obj, (0, _defineProperty3.default)({}, key, (0, _extends4.default)({}, errorCodes[key], {
    code: key
  })));
}, {});