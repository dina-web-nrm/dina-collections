'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var normalizeProperty = function normalizeProperty(_ref) {
  var normalize = _ref.normalize,
      property = _ref.property,
      injectedNormalizeModel = _ref.injectedNormalizeModel;

  if (!property) {
    return property;
  }

  var normalizedProperty = (0, _extends4.default)({}, property);

  if (property.type === 'object' && normalizedProperty.properties) {
    return injectedNormalizeModel({
      model: property,
      normalize: normalize
    });
  }

  if (property.type === 'array' && normalizedProperty.items) {
    return (0, _extends4.default)({}, normalizedProperty, {
      items: normalizeProperty({
        injectedNormalizeModel: injectedNormalizeModel,
        normalize: normalize,
        property: normalizedProperty.items
      })
    });
  }

  if (normalize && property.$ref && property['x-reference-type'] && property['x-reference-type'] === 'external') {
    normalizedProperty = (0, _extends4.default)({}, property, {
      $ref: '__ROOT__externalModelReference'
    });
  }

  if (normalize && property.$ref && property['x-reference-type'] && property['x-reference-type'] === 'internal') {
    normalizedProperty = {
      $ref: '__ROOT__lid'
    };
  }

  if (normalizedProperty['x-reference-type']) {
    delete normalizedProperty['x-reference-type'];
  }
  return normalizedProperty;
};

function normalizeModel(_ref2) {
  var model = _ref2.model,
      normalize = _ref2.normalize;

  var _ref3 = model || {},
      properties = _ref3.properties;

  var normalizedProperties = (0, _keys2.default)(properties).reduce(function (obj, key) {
    var property = properties[key];
    return (0, _extends4.default)({}, obj, (0, _defineProperty3.default)({}, key, normalizeProperty({
      injectedNormalizeModel: normalizeModel,
      normalize: normalize,
      property: property
    })));
  }, properties);

  return (0, _extends4.default)({}, model, {
    properties: normalizedProperties
  });
}

module.exports = normalizeModel;