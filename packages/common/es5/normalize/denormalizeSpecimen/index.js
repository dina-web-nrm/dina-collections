'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends4 = require('babel-runtime/helpers/extends');

var _extends5 = _interopRequireDefault(_extends4);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('normalizr'),
    denormalize = _require.denormalize;

var buildNormalizeSchema = require('../buildNormalizeSchema');
var normalizedSchemaSpecification = require('../normalizedSchemaSpecification');
var columnArrayToObject = require('./columnArrayToObject');

var normalizeSchema = buildNormalizeSchema({
  normalizedSchemaSpecification: normalizedSchemaSpecification.specimen,
  rootSchema: 'individualGroup'
});

var columnNames = (0, _keys2.default)(normalizedSchemaSpecification.specimen).map(function (key) {
  return normalizedSchemaSpecification.specimen[key].column;
});

module.exports = function denormalizeIndividualGroup(normalizedSpecimen) {
  var _normalizedSpecimen$i = normalizedSpecimen.individualGroup,
      individualGroup = _normalizedSpecimen$i === undefined ? {} : _normalizedSpecimen$i;


  var rest = {};
  var entities = (0, _keys2.default)(normalizedSpecimen).reduce(function (obj, columnName) {
    if (!columnNames.includes(columnName)) {
      rest[columnName] = normalizedSpecimen[columnName];
      return obj;
    }
    if (columnName === 'individualGroup') {
      return (0, _extends5.default)({}, obj, (0, _defineProperty3.default)({}, columnName, columnArrayToObject([normalizedSpecimen[columnName]])));
    }
    return (0, _extends5.default)({}, obj, (0, _defineProperty3.default)({}, columnName, columnArrayToObject(normalizedSpecimen[columnName]) || {}));
  }, {});

  var denormalizedData = denormalize(individualGroup.lid, normalizeSchema.individualGroup, entities);

  return (0, _extends5.default)({ individualGroup: denormalizedData || {} }, rest);
};