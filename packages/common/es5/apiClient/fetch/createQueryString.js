'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function createQueryString() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return encodeURI((0, _keys2.default)(params).filter(function (key) {
    return params[key] !== undefined;
  }).map(function (key) {
    return key + '=' + params[key];
  }).join('&'));
};