'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (object, key, value) {
  var regex = new RegExp(key, 'g');
  return JSON.parse((0, _stringify2.default)(object).replace(regex, value));
};