'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errorStatus = {
  400: {
    title: 'Bad Request'
  },
  401: {
    title: 'Unauthorized'
  },
  403: {
    title: 'Forbidden'
  },
  404: {
    title: 'Not Found'
  },
  405: {
    title: 'Method Not Allowed'
  },
  406: {
    title: 'Not Acceptable'
  },
  415: {
    title: '??'
  },
  500: {
    title: 'Internal Server Error'
  },
  501: {
    title: 'Not Implemented'
  }
};

module.exports = (0, _keys2.default)(errorStatus).reduce(function (obj, key) {
  return (0, _extends4.default)({}, obj, (0, _defineProperty3.default)({}, key, (0, _extends4.default)({}, errorStatus[key], {
    status: key
  })));
}, {});