"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function columnObjectToArray(columnObject) {
  if (!columnObject) {
    return columnObject;
  }
  return (0, _keys2.default)(columnObject).sort(function (a, b) {
    if (a > b) {
      return -1;
    }
    if (b > a) {
      return 1;
    }
    return 0;
  }).map(function (key) {
    var column = columnObject[key];
    if (column.lid) {
      return column;
    }

    column.lid = key;
    return column;
  });
};