const createNormalizeSpecification = require('./createNormalizeSpecification')

module.exports = function createNormalizeSpecifications({ models }) {
  return Object.keys(models).reduce((schemas, modelKey) => {
    if (models[modelKey]['x-normalize']) {
      return {
        ...schemas,
        [modelKey]: createNormalizeSpecification({
          modelKey,
          models,
        }),
      }
    }
    return schemas
  }, {})
}
