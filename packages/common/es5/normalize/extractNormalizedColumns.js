'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var columnObjectToArray = require('./columnObjectToArray');

module.exports = function extractNormalizedColumns(_ref) {
  var doc = _ref.doc,
      normalizedColumnNames = _ref.normalizedColumnNames;

  return normalizedColumnNames.reduce(function (normalizedColumns, normalizedColumnName) {
    return (0, _extends4.default)({}, normalizedColumns, (0, _defineProperty3.default)({}, normalizedColumnName, normalizedColumnName !== 'relationships' && normalizedColumnName !== 'individualGroup' ? columnObjectToArray(doc[normalizedColumnName]) : doc[normalizedColumnName]));
  }, {});
};