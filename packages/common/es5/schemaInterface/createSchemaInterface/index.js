'use strict';

var _require = require('../normalize'),
    createModelKeyColumnMap = _require.createModelKeyColumnMap,
    createNormalizeSpecifications = _require.createNormalizeSpecifications;

var _require2 = require('../relationships'),
    _getRelationshipParamsForModelNames = _require2.getRelationshipParamsForModelNames,
    _getResourceRelationshipParamsMap = _require2.getResourceRelationshipParamsMap,
    _getResourceRelationshipKeysToIncludeInBodyMap = _require2.getResourceRelationshipKeysToIncludeInBodyMap;

module.exports = function (_ref) {
  var models = _ref.models;

  return {
    getModelKeyColumnMap: function getModelKeyColumnMap() {
      return createModelKeyColumnMap({ models: models });
    },
    getNormalizeSpecifications: function getNormalizeSpecifications() {
      return createNormalizeSpecifications({ models: models });
    },
    getRelationshipParamsForModelNames: function getRelationshipParamsForModelNames(modelNames) {
      return _getRelationshipParamsForModelNames(models, modelNames);
    },
    getResourceRelationshipKeysToIncludeInBodyMap: function getResourceRelationshipKeysToIncludeInBodyMap() {
      return _getResourceRelationshipKeysToIncludeInBodyMap(models);
    },
    getResourceRelationshipParamsMap: function getResourceRelationshipParamsMap() {
      return _getResourceRelationshipParamsMap(models);
    }
  };
};