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

module.exports = ({
  getModelInfo,
  getModels,
  getNormalizedModels,
  getOpenApiSpec,
}) => {
  return {
    getDataModelVersion: () => {
      const modelInfo = getModelInfo()
      return modelInfo.modelVersion
    },
    getMethodByOperationId: operationId =>
      getMethodByOperationId(getOpenApiSpec(), operationId),
    getModelKeyColumnMap: () =>
      createModelKeyColumnMap({ models: getModels() }),
    getModels: () => {
      return getModels()
    },
    getNormalizedModels: () => {
      return getNormalizedModels()
    },
    getNormalizeSpecifications: () =>
      createNormalizeSpecifications({ models: getNormalizedModels() }),
    getOpenApiSpec: () => {
      return getOpenApiSpec()
    },
    getRelationshipParamsForModelNames: modelNames =>
      getRelationshipParamsForModelNames(getNormalizedModels(), modelNames),
    getResourceRelationshipKeysToIncludeInBodyMap: () =>
      getResourceRelationshipKeysToIncludeInBodyMap(getNormalizedModels()),
    getResourceRelationshipParamsMap: () =>
      getResourceRelationshipParamsMap(getNormalizedModels()),
  }
}
