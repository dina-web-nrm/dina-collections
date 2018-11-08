const { getMethodByOperationId } = require('../openApi')

const {
  createModelKeyColumnMap,
  createNormalizeSpecifications,
} = require('../normalize')
const {
  getRelationshipParamsForModelNames,
  getResourceRelationshipParamsMap,
  getResourceRelationshipKeysToIncludeInBodyMap,
} = require('../relationships')

module.exports = singletons => {
  return {
    getDataModelVersion: () => {
      const modelInfo = singletons.getModelInfo()
      return modelInfo.modelVersion
    },
    getMethodByOperationId: operationId =>
      getMethodByOperationId(singletons.getOpenApiSpec(), operationId),
    getModelKeyColumnMap: () =>
      createModelKeyColumnMap({ models: singletons.getModels() }),
    getModels: () => {
      return singletons.getModels()
    },
    getNormalizedModels: () => {
      return singletons.getNormalizedModels()
    },
    getNormalizeSpecifications: () =>
      createNormalizeSpecifications({ models: singletons.getModels() }),
    getOpenApiSpec: () => {
      return singletons.getOpenApiSpec()
    },

    getRelationshipParamsForModelNames: modelNames =>
      getRelationshipParamsForModelNames(singletons.getModels(), modelNames),
    getResourceRelationshipKeysToIncludeInBodyMap: () =>
      getResourceRelationshipKeysToIncludeInBodyMap(singletons.getModels()),
    getResourceRelationshipParamsMap: () =>
      getResourceRelationshipParamsMap(singletons.getModels()),
  }
}
