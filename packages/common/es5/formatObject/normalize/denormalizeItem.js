'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('normalizr'),
    denormalize = _require.denormalize;

var columnArrayToObject = require('../utilities/columnArrayToObject');

module.exports = function denormalizeItem(_ref) {
  var item = _ref.item,
      normalizeSpecification = _ref.normalizeSpecification,
      type = _ref.type;
  var normalized = item.normalized,
      rest = (0, _objectWithoutProperties3.default)(item, ['normalized']);

  var schema = normalizeSpecification;
  var entities = (0, _keys2.default)(normalized || {}).reduce(function (obj, columnName) {
    return (0, _extends4.default)({}, obj, (0, _defineProperty3.default)({}, columnName, columnArrayToObject(normalized[columnName])));
  }, {});
  return denormalize(rest, schema[type], entities);
};