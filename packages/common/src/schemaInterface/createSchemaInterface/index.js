const {
  createModelKeyColumnMap,
  createNormalizeSpecifications,
} = require('../normalize')
const {
  getRelationshipParamsForModelNames,
  getResourceRelationshipParamsMap,
  getResourceRelationshipKeysToIncludeInBodyMap,
} = require('../relationships')

module.exports = ({ models }) => {
  return {
    getModelKeyColumnMap: () => createModelKeyColumnMap({ models }),
    getNormalizeSpecifications: () => createNormalizeSpecifications({ models }),
    getRelationshipParamsForModelNames: modelNames =>
      getRelationshipParamsForModelNames(models, modelNames),
    getResourceRelationshipKeysToIncludeInBodyMap: () =>
      getResourceRelationshipKeysToIncludeInBodyMap(models),
    getResourceRelationshipParamsMap: () =>
      getResourceRelationshipParamsMap(models),
  }
}
