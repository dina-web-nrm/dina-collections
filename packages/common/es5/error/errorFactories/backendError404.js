'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var backendError = require('./backendError');

module.exports = function backendError404(_ref) {
  var args = (0, _objectWithoutProperties3.default)(_ref, []);

  return backendError((0, _extends3.default)({}, args, {
    status: 404
  }));
};