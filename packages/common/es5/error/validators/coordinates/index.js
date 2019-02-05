'use strict';

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var latitude = function latitude(value) {
  if (!value) {
    return true;
  }

  var number = Number(value);
  if ((0, _isNan2.default)(number)) {
    return false;
  }

  return number >= -90 && number <= 90;
};

var longitude = function longitude(value) {
  if (!value) {
    return true;
  }

  var number = Number(value);
  if ((0, _isNan2.default)(number)) {
    return false;
  }
  return number >= -180 && number <= 180;
};

var stringWithOnlyDigitsAndMaximumOnePoint = function stringWithOnlyDigitsAndMaximumOnePoint(value) {
  if (typeof value !== 'string') {
    return false;
  }

  if (!value) {
    return true;
  }

  return value.match(/^-{0,1}\d{1,}\.{0,1}\d*$/) !== null;
};

exports.latitude = latitude;
exports.longitude = longitude;
exports.stringWithOnlyDigitsAndMaximumOnePoint = stringWithOnlyDigitsAndMaximumOnePoint;