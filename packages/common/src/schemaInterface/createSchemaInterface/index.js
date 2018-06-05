const {
  getRelationshipParamsForModelNames,
  getResourceRelationshipParamsMap,
  getResourceRelationshipKeysToIncludeInBodyMap,
} = require('../relationships')

module.exports = ({ models }) => {
  return {
    getRelationshipParamsForModelNames: modelNames =>
      getRelationshipParamsForModelNames(models, modelNames),
    getResourceRelationshipKeysToIncludeInBodyMap: () =>
      getResourceRelationshipKeysToIncludeInBodyMap(models),
    getResourceRelationshipParamsMap: () =>
      getResourceRelationshipParamsMap(models),
  }
}
