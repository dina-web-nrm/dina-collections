'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var objectPath = require('object-path');

var _require = require('reselect'),
    createSelector = _require.createSelector;

var _require2 = require('./modelsSelectors'),
    getAllModelNames = _require2.getAllModelNames,
    getModelRelationshipsSchemaForModel = _require2.getModelRelationshipsSchemaForModel,
    getModels = _require2.getModels;

var _require3 = require('./relationshipsSchemaSelectors'),
    getKeyAllowNull = _require3.getKeyAllowNull,
    getKeyName = _require3.getKeyName,
    getKeyStoredInModel = _require3.getKeyStoredInModel,
    getKeyType = _require3.getKeyType,
    getPath = _require3.getPath,
    getTargetFormat = _require3.getTargetFormat,
    getTargetModel = _require3.getTargetModel,
    getTargetOneOrMany = _require3.getTargetOneOrMany;

var getRelationshipParamsFromRelationshipsSchemaItem = function getRelationshipParamsFromRelationshipsSchemaItem(_ref) {
  var modelName = _ref.modelName,
      relationshipKey = _ref.relationshipKey,
      relationshipsSchemaItem = _ref.relationshipsSchemaItem;

  var keyStoredInModel = getKeyStoredInModel(relationshipsSchemaItem);
  var keyType = getKeyType(relationshipsSchemaItem);

  return relationshipsSchemaItem && {
    allowNull: getKeyAllowNull(relationshipsSchemaItem),
    format: getTargetFormat(relationshipsSchemaItem),
    keyName: getKeyName(relationshipsSchemaItem),
    keyStoredInModel: keyStoredInModel,
    keyType: keyType,
    oneOrMany: getTargetOneOrMany(relationshipsSchemaItem),
    path: getPath(relationshipsSchemaItem),
    sourceResource: modelName,
    storeInDocument: keyType === 'json' && keyStoredInModel === modelName,
    storeInExternalDocument: keyType === 'json' && keyStoredInModel !== modelName,
    targetAs: relationshipKey,
    targetResource: getTargetModel(relationshipsSchemaItem)
  };
};

var getRelationshipParamsForModelNames = createSelector(getModels, function (_, modelNames) {
  return modelNames;
}, function (models, modelNames) {
  return modelNames.reduce(function (modelsAssociationParams, modelName) {
    var schema = getModelRelationshipsSchemaForModel(models, modelName);
    var schemaProperties = schema && schema.properties || {};

    if (schema) {
      (0, _keys2.default)(schemaProperties).forEach(function (relationshipKey) {
        return modelsAssociationParams.push(getRelationshipParamsFromRelationshipsSchemaItem({
          modelName: modelName,
          relationshipKey: relationshipKey,
          relationshipsSchemaItem: schemaProperties[relationshipKey]
        }));
      });
    }

    return modelsAssociationParams;
  }, []);
});

var getRelationshipParamsForAllModels = createSelector(getModels, function (models) {
  var allModelNames = getAllModelNames(models);
  return getRelationshipParamsForModelNames(models, allModelNames);
});

var getResourceRelationshipParamsMap = createSelector(getModels, function (models) {
  var allModelNames = getAllModelNames(models);

  return allModelNames.reduce(function (map, modelName) {
    var relationshipParams = getRelationshipParamsForModelNames(models, [modelName]);

    if (relationshipParams && relationshipParams.length) {
      relationshipParams.forEach(function (params) {
        objectPath.set(map, modelName + '.' + params.targetAs, params);
      });
    }

    return map;
  }, {});
});

var getResourceRelationshipKeysToIncludeInBodyMap = createSelector(getModels, function (models) {
  var allModelNames = getAllModelNames(models);

  return allModelNames.reduce(function (map, modelName) {
    var relationshipParams = getRelationshipParamsForModelNames(models, [modelName]);

    if (relationshipParams && relationshipParams.length) {
      var relationshipKeys = relationshipParams.filter(function (_ref2) {
        var keyType = _ref2.keyType;
        return keyType === 'json';
      }).map(function (_ref3) {
        var targetAs = _ref3.targetAs;
        return targetAs;
      });

      if (relationshipKeys && relationshipKeys.length) {
        objectPath.set(map, modelName, relationshipKeys);
      }
    }

    return map;
  }, {});
});

module.exports = {
  getRelationshipParamsForAllModels: getRelationshipParamsForAllModels,
  getRelationshipParamsForModelNames: getRelationshipParamsForModelNames,
  getRelationshipParamsFromRelationshipsSchemaItem: getRelationshipParamsFromRelationshipsSchemaItem,
  getResourceRelationshipKeysToIncludeInBodyMap: getResourceRelationshipKeysToIncludeInBodyMap,
  getResourceRelationshipParamsMap: getResourceRelationshipParamsMap
};