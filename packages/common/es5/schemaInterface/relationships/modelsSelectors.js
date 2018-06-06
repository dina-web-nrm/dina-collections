'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = require('reselect'),
    createSelector = _require.createSelector;

var getModels = function getModels(models) {
  return models;
};

var getModelRelationshipsSchemaMap = createSelector(getModels, function (models) {
  if (!models) {
    throw new Error('missing models');
  }

  return (0, _keys2.default)(models).reduce(function (modelRelationships, modelName) {
    var relationships = models && models[modelName] && models[modelName].properties && models[modelName].properties.relationships;

    if (relationships) {
      return (0, _extends4.default)({}, modelRelationships, (0, _defineProperty3.default)({}, modelName, relationships));
    }

    return modelRelationships;
  }, {});
});

var getAllModelNames = createSelector(getModelRelationshipsSchemaMap, function (modelRelationshipsMap) {
  return (0, _keys2.default)(modelRelationshipsMap);
});

var getModelRelationshipsSchemaForModel = createSelector(getModelRelationshipsSchemaMap, function (_, modelName) {
  return modelName;
}, function (modelRelationshipsMap, modelName) {
  if (!modelName) {
    throw new Error('missing model name');
  }

  if (!modelRelationshipsMap[modelName]) {
    throw new Error('model ' + modelName + ' not found in models');
  }

  return modelRelationshipsMap[modelName];
});

module.exports = {
  getAllModelNames: getAllModelNames,
  getModelRelationshipsSchemaForModel: getModelRelationshipsSchemaForModel,
  getModelRelationshipsSchemaMap: getModelRelationshipsSchemaMap,
  getModels: getModels
};