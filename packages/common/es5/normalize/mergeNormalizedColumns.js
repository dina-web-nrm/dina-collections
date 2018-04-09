'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var columnArrayToObject = require('./columnArrayToObject');

module.exports = function mergeNormalizedColumns(_ref) {
  var dataValues = _ref.dataValues,
      normalizedColumnNames = _ref.normalizedColumnNames;

  if (!dataValues) {
    return dataValues;
  }

  return (0, _keys2.default)(dataValues).reduce(function (normalizedValues, key) {
    if (normalizedColumnNames.includes(key)) {
      if (!dataValues[key]) {
        return normalizedValues;
      }
      return (0, _extends4.default)({}, normalizedValues, (0, _defineProperty3.default)({}, key, key !== 'relationships' && key !== 'individualGroup' ? columnArrayToObject(dataValues[key]) : dataValues[key]));
    }
    return normalizedValues;
  }, {});
};