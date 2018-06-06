'use strict';

var _require = require('../relationships'),
    _getRelationshipParamsForModelNames = _require.getRelationshipParamsForModelNames,
    _getResourceRelationshipParamsMap = _require.getResourceRelationshipParamsMap,
    _getResourceRelationshipKeysToIncludeInBodyMap = _require.getResourceRelationshipKeysToIncludeInBodyMap;

module.exports = function (_ref) {
  var models = _ref.models;

  return {
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