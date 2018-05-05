'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends5 = require('babel-runtime/helpers/extends');

var _extends6 = _interopRequireDefault(_extends5);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('normalizr'),
    normalize = _require.normalize;

var buildNormalizeSchema = require('../buildNormalizeSchema');
var normalizedSchemaSpecification = require('../normalizedSchemaSpecification');
var columnObjectToArray = require('./columnObjectToArray');

var normalizeSchema = buildNormalizeSchema({
  normalizedSchemaSpecification: normalizedSchemaSpecification.specimen,
  rootSchema: 'individual'
});

var columnNames = (0, _keys2.default)(normalizedSchemaSpecification.specimen).map(function (key) {
  return normalizedSchemaSpecification.specimen[key].column;
});

module.exports = function normalizeSpecimen(denormalizedSpecimenInput) {
  console.log('denormalizedSpecimenInput', denormalizedSpecimenInput);
  var denormalizedSpecimen = JSON.parse((0, _stringify2.default)(denormalizedSpecimenInput));
  var _denormalizedSpecimen = denormalizedSpecimen.individual,
      individual = _denormalizedSpecimen === undefined ? {} : _denormalizedSpecimen,
      rest = (0, _objectWithoutProperties3.default)(denormalizedSpecimen, ['individual']);


  var normalizedData = normalize(individual, normalizeSchema.individual);

  var entities = normalizedData.entities;

  var data = (0, _keys2.default)(entities).reduce(function (obj, columnName) {
    if (!columnNames.includes(columnName)) {
      return (0, _extends6.default)({}, obj, (0, _defineProperty3.default)({}, columnName, entities[columnName]));
    }
    if (columnName === 'individual') {
      return (0, _extends6.default)({}, obj, (0, _defineProperty3.default)({}, columnName, columnObjectToArray(entities[columnName])[0]));
    }
    return (0, _extends6.default)({}, obj, (0, _defineProperty3.default)({}, columnName, columnObjectToArray(entities[columnName])));
  }, {});
  return (0, _extends6.default)({}, rest, data);
};