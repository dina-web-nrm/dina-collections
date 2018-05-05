const createNormalizeSchema = require('./createNormalizeSchema')

module.exports = function createNormalizeSchemas({ models }) {
  return Object.keys(models).reduce((schemas, modelKey) => {
    if (models[modelKey]['x-normalize']) {
      return {
        ...schemas,
        [modelKey]: createNormalizeSchema({
          modelKey,
          models,
        }),
      }
    }
    return schemas
  }, {})
}
