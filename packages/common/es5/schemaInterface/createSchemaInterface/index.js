'use strict';

var _require = require('../openApi'),
    _getMethodByOperationId = _require.getMethodByOperationId;

var _require2 = require('../normalize'),
    createModelKeyColumnMap = _require2.createModelKeyColumnMap,
    createNormalizeSpecifications = _require2.createNormalizeSpecifications;

var _require3 = require('../relationships'),
    _getRelationshipParamsForModelNames = _require3.getRelationshipParamsForModelNames,
    _getResourceRelationshipParamsMap = _require3.getResourceRelationshipParamsMap,
    _getResourceRelationshipKeysToIncludeInBodyMap = _require3.getResourceRelationshipKeysToIncludeInBodyMap;

module.exports = function (singletons) {
  return {
    getDataModelVersion: function getDataModelVersion() {
      var modelInfo = singletons.getModelInfo();
      return modelInfo.modelVersion;
    },
    getMethodByOperationId: function getMethodByOperationId(operationId) {
      return _getMethodByOperationId(singletons.getOpenApiSpec(), operationId);
    },
    getModelKeyColumnMap: function getModelKeyColumnMap() {
      return createModelKeyColumnMap({ models: singletons.getModels() });
    },
    getModels: function getModels() {
      return singletons.getModels();
    },
    getNormalizedModels: function getNormalizedModels() {
      return singletons.getNormalizedModels();
    },
    getNormalizeSpecifications: function getNormalizeSpecifications() {
      return createNormalizeSpecifications({ models: singletons.getModels() });
    },
    getOpenApiSpec: function getOpenApiSpec() {
      return singletons.getOpenApiSpec();
    },

    getRelationshipParamsForModelNames: function getRelationshipParamsForModelNames(modelNames) {
      return _getRelationshipParamsForModelNames(singletons.getModels(), modelNames);
    },
    getResourceRelationshipKeysToIncludeInBodyMap: function getResourceRelationshipKeysToIncludeInBodyMap() {
      return _getResourceRelationshipKeysToIncludeInBodyMap(singletons.getModels());
    },
    getResourceRelationshipParamsMap: function getResourceRelationshipParamsMap() {
      return _getResourceRelationshipParamsMap(singletons.getModels());
    }
  };
};