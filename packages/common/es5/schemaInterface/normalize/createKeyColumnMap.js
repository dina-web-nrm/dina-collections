'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getModelIsColumn = require('./utilities/getModelIsColumn');
var getModelType = require('./utilities/getModelType');
var getModelColumn = require('./utilities/getModelColumn');

module.exports = function createKeyColumnMap(model) {
  var normalizedNamespaceProperties = model && model.properties && model.properties.normalized && model.properties.normalized.properties || {};

  return (0, _keys2.default)(normalizedNamespaceProperties).reduce(function (map, propertyKey) {
    var property = normalizedNamespaceProperties[propertyKey];

    if (!getModelIsColumn(property)) {
      return map;
    }
    var type = getModelType(property);

    return (0, _extends4.default)({}, map, (0, _defineProperty3.default)({}, type, getModelColumn(property)));
  }, {});
};