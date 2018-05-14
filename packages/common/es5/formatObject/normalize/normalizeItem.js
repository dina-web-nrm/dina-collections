'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('normalizr'),
    normalize = _require.normalize;

var columnObjectToArray = require('../utilities/columnObjectToArray');

module.exports = function normalizeItem(_ref) {
  var item = _ref.item,
      normalizeSpecification = _ref.normalizeSpecification,
      resourceType = _ref.resourceType;

  var schema = normalizeSpecification;
  var columnNames = (0, _keys2.default)(schema);
  var normalizedData = normalize(item, schema[resourceType]);
  var entities = normalizedData.entities;

  var data = (0, _keys2.default)(entities).reduce(function (obj, columnName) {
    if (columnName === resourceType) {
      var entry = entities[columnName];
      var id = (0, _keys2.default)(entry)[0];
      return (0, _extends5.default)({}, obj, entities[columnName][id]);
    }
    if (!columnNames.includes(columnName)) {
      return (0, _extends5.default)({}, obj, (0, _defineProperty3.default)({}, columnName, entities[columnName]));
    }

    return (0, _extends5.default)({}, obj, {
      normalized: (0, _extends5.default)({}, obj.normalized, (0, _defineProperty3.default)({}, columnName, columnObjectToArray(entities[columnName])))
    });
  }, { normalized: {} });
  return data;
};